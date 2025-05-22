import type * as t from "@babel/types"
import type { NodePath } from "@babel/core"
import type { Context } from "./Context.js"
import { optimizeCall } from "./optimizeCall.js"

export function buildCond(
    ctx: Context,
    call: NodePath<t.CallExpression>,
    value: t.Expression,
): void {
    const [pattern, result] = call.node.arguments

    ctx.assertExpression(pattern)
    ctx.assertExpression(result)

    ctx.addBranch([
        optimizeCall(ctx, call.get("arguments.0"), value),
        result,
    ])
}
