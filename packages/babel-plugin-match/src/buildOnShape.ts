import type * as t from "@babel/types"
import type { NodePath } from "@babel/core"
import type { Context } from "./Context.js"
import { optimizeShape } from "./optimizeShape.js"
import { optimizeCall } from "./optimizeCall.js"

export function buildOnShape(
    ctx: Context,
    call: NodePath<t.CallExpression>,
    value: t.Expression,
): void {
    const [pattern, result] = call.node.arguments

    ctx.assertObjectExpression(pattern)
    ctx.assertExpression(result)

    ctx.addBranch([
        optimizeShape(ctx, pattern, value),
        optimizeCall(ctx, call.get("arguments.1"), value),
    ])
}
