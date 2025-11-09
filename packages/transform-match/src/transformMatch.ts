import type { Node } from "oxc-parser"
import type { Branch, Context } from "./types"
import { abort, AbortError } from "./helpers"
import { transformCallback } from "./transformCallback"

export function transformMatch(node: Node, branches: Branch[], ctx: Context): boolean {
    const match = branches.find(branch => branch.name === "match")
    if (!match) return false

    const value = match.node.arguments[0]
    if (!value) return false

    try {
        if (value.type === "Identifier") {
            const result = transformBranches(value.name, branches, ctx)
            ctx.ms.overwrite(node.start, node.end, result)
            return true
        }
        else {
            const id = ctx.id("match")
            const result = `((${id}) => ${transformBranches(id, branches, ctx)})(${ctx.code.slice(value.start, value.end)})`
            ctx.ms.overwrite(node.start, node.end, result)
            return true
        }
    }
    catch (error) {
        if (error instanceof AbortError) return false
        throw error
    }
}

function transformBranches(value: string, branches: Branch[], ctx: Context): string {
    const code: string[] = []

    for (const branch of branches) {
        if (branch.name === "case") {
            const [left, right] = branch.node.arguments
            if (!left || !right) abort()
            code.push(`(${value} === (${ctx.code.slice(left.start, left.end)})) ? (${ctx.code.slice(right.start, right.end)})`)
        }

        else if (branch.name === "onCase") {
            const [left, right] = branch.node.arguments
            if (!left || !right) abort()
            code.push(`(${value} === (${ctx.code.slice(left.start, left.end)})) ? (${transformCallback(value, right, ctx)})`)
        }

        else if (branch.name === "cond") {
            const [left, right] = branch.node.arguments
            if (!left || !right) abort()
            code.push(`(${transformCallback(value, left, ctx)}) ? (${ctx.code.slice(right.start, right.end)})`)
        }

        else if (branch.name === "onCond") {
            const [left, right] = branch.node.arguments
            if (!left || !right) abort()
            code.push(`(${transformCallback(value, left, ctx)}) ? (${transformCallback(value, right, ctx)})`)
        }

        else if (branch.name === "or") {
            if (!branch.node.arguments[0]) abort()
            code.push(`(${ctx.code.slice(branch.node.arguments[0].start, branch.node.arguments[0].end)})`)
        }

        else if (branch.name === "orElse") {
            if (!branch.node.arguments[0]) abort()
            code.push(`(${transformCallback(value, branch.node.arguments[0], ctx)})`)
        }

        else if (branch.name === "orThrow") {
            code.push(`(() => { throw new Error(\`Pattern matching error: no pattern matches value \${${value}}\`) })()`)
        }
    }

    return code.join("\n: ")
}
