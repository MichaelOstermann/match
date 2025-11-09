import type { Node } from "oxc-parser"
import type { Branch } from "./types"

export function collectBranches(node: Node): Branch[] | undefined {
    if (
        node.type === "CallExpression"
        && node.callee.type === "MemberExpression"
        && node.callee.object.type === "CallExpression"
        && node.callee.property.type === "Identifier"
        && (node.callee.property.name === "or" || node.callee.property.name === "orElse" || node.callee.property.name === "orThrow")
    ) {
        let pivot = node.callee.object
        const branches: Branch[] = []
        branches.push({ name: node.callee.property.name, node })

        while (
            pivot.type === "CallExpression"
            && pivot.callee.type === "MemberExpression"
            && (pivot.callee.object.type === "CallExpression" || pivot.callee.object.type === "Identifier")
            && pivot.callee.property.type === "Identifier"
        ) {
            const name = pivot.callee.property.name
            const call = pivot
            if (name === "returnType") {
                continue
            }
            else if (name === "case") {
                branches.unshift({ name: "case", node: call })
            }
            else if (name === "onCase") {
                branches.unshift({ name: "onCase", node: call })
            }
            else if (name === "cond") {
                branches.unshift({ name: "cond", node: call })
            }
            else if (name === "onCond") {
                branches.unshift({ name: "onCond", node: call })
            }
            else if (name === "shape") {
                branches.unshift({ name: "shape", node: call })
            }
            else {
                return
            }

            if (pivot.callee.object.type === "CallExpression") {
                pivot = pivot.callee.object
            }
            else if (pivot.callee.object.type === "Identifier") {
                if (pivot.callee.object.name === "match") break
                else return
            }
        }

        if (pivot.callee.type === "Identifier" && pivot.callee.name === "match") {
            branches.unshift({ name: "match", node: pivot })
        }
        else if (pivot.callee.type === "MemberExpression" && pivot.callee.object.type === "Identifier" && pivot.callee.object.name === "match") {
            branches.unshift({ name: "match", node: pivot })
        }

        return branches
    }

    return undefined
}
