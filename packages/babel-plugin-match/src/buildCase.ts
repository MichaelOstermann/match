import * as t from "@babel/types"
import type { NodePath } from "@babel/core"
import type { Context } from "./Context.js"

export function buildCase(
    ctx: Context,
    call: NodePath<t.CallExpression>,
    value: t.Expression,
): void {
    const [pattern, result] = call.node.arguments

    ctx.assertExpression(pattern)
    ctx.assertExpression(result)

    ctx.addBranch([
        t.binaryExpression("===", value, pattern),
        result,
    ])
}
