import type { Expression, Node } from "oxc-parser"
import type { Identifier } from "oxc-walker"
import type { Context } from "./types"
import MagicString from "magic-string"
import { ScopeTracker, walk } from "oxc-walker"

export function transformCallback(value: string, cb: Node, ctx: Context): string {
    // () => value
    if (
        cb.type === "ArrowFunctionExpression"
        && cb.params.length === 0
        && cb.body.type !== "BlockStatement"
    ) {
        return ctx.code.slice(cb.body.start, cb.body.end)
    }

    // () => {}
    if (
        cb.type === "ArrowFunctionExpression"
        && cb.params.length === 0
        && cb.body.type === "BlockStatement"
        && !cb.body.body
    ) {
        return "undefined"
    }

    // () => { return }
    if (
        cb.type === "ArrowFunctionExpression"
        && cb.params.length === 0
        && cb.body.type === "BlockStatement"
        && cb.body.body[0]?.type === "ReturnStatement"
        && !cb.body.body[0].argument
    ) {
        return "undefined"
    }

    // () => { return value }
    if (
        cb.type === "ArrowFunctionExpression"
        && cb.params.length === 0
        && cb.body.type === "BlockStatement"
        && cb.body.body[0]?.type === "ReturnStatement"
        && cb.body.body[0].argument
    ) {
        return ctx.code.slice(cb.body.body[0].argument.start, cb.body.body[0].argument.end)
    }

    // function() {}
    if (
        cb.type === "FunctionExpression"
        && cb.params.length === 0
        && !cb.body
    ) {
        return "undefined"
    }

    // function() { return }
    if (
        cb.type === "FunctionExpression"
        && cb.params.length === 0
        && cb.body?.type === "BlockStatement"
        && cb.body.body[0]?.type === "ReturnStatement"
        && !cb.body.body[0].argument
    ) {
        return "undefined"
    }

    // function() { return value }
    if (
        cb.type === "FunctionExpression"
        && cb.params.length === 0
        && cb.body?.type === "BlockStatement"
        && cb.body.body[0]?.type === "ReturnStatement"
        && cb.body.body[0].argument
    ) {
        return ctx.code.slice(cb.body.body[0].argument.start, cb.body.body[0].argument.end)
    }

    // (param) => param
    if (
        cb.type === "ArrowFunctionExpression"
        && cb.params[0]?.type === "Identifier"
        && cb.body.type !== "BlockStatement"
    ) {
        const param = cb.params[0]
        return optimizeCallback(value, param, cb.body, ctx)
    }

    // (param) => { return param }
    if (
        cb.type === "ArrowFunctionExpression"
        && cb.params[0]?.type === "Identifier"
        && cb.body.type === "BlockStatement"
        && cb.body.body[0]?.type === "ReturnStatement"
        && cb.body.body[0].argument
    ) {
        const param = cb.params[0]
        optimizeCallback(value, param, cb.body.body[0].argument, ctx)
    }

    // function(param) { return param }
    if (
        cb.type === "FunctionExpression"
        && cb.params[0]?.type === "Identifier"
        && cb.body?.type === "BlockStatement"
        && cb.body.body[0]?.type === "ReturnStatement"
        && cb.body.body[0].argument
    ) {
        const param = cb.params[0]
        optimizeCallback(value, param, cb.body.body[0].argument, ctx)
    }

    return `(${ctx.code.slice(cb.start, cb.end)})(${value})`
}

function optimizeCallback(value: string, param: Identifier, body: Expression, ctx: Context): string {
    const scope = new ScopeTracker()
    const parents: Node[] = []
    const start = body.start
    const code = new MagicString(ctx.code.slice(body.start, body.end))
    walk(body, {
        scopeTracker: scope,
        enter(node) {
            if (node.type === "Identifier" && node.name === param.name && scope.getDeclaration(node.name)?.node == null) {
                if (!shouldSkip(node, parents))
                    code.overwrite(node.start - start, node.end - start, value)
            }
            parents.push(node)
        },
        leave() {
            parents.pop()
        },
    })
    return code.toString()
}

function shouldSkip(node: Identifier, parents: Node[]): boolean {
    const parent = parents.at(-1)
    if (parent?.type === "MemberExpression" && parent.property === node && !parent.computed) return true
    if (parent?.type === "Property" && parent.key === node && !parent.computed) return true
    if (parent?.type === "AssignmentExpression" && parent.left === node) return true
    if (parent?.type === "UpdateExpression") return true
    return false
}
