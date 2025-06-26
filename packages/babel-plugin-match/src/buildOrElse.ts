import type { NodePath } from "@babel/core"
import type * as t from "@babel/types"
import type { Context } from "./Context"
import { optimizeCall } from "./optimizeCall"

export function buildOrElse(
    ctx: Context,
    call: NodePath<t.CallExpression>,
    value: t.Expression,
): void {
    const [fallback] = call.node.arguments
    ctx.assertExpression(fallback)
    ctx.build(call, optimizeCall(ctx, call.get("arguments.0"), value))
}
