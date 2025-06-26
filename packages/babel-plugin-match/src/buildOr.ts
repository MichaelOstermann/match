import type { NodePath } from "@babel/core"
import type * as t from "@babel/types"
import type { Context } from "./Context"

export function buildOr(
    ctx: Context,
    call: NodePath<t.CallExpression>,
    _value: t.Expression,
): void {
    const [fallback] = call.node.arguments
    ctx.assertExpression(fallback)
    ctx.build(call, fallback)
}
