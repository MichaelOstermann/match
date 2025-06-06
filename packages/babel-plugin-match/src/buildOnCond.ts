import * as t from "@babel/types"
import type { NodePath } from "@babel/core"
import type { Context } from "./Context.js"
import { optimizeCall } from "./optimizeCall.js"

export function buildOnCond(
    ctx: Context,
    call: NodePath<t.CallExpression>,
    value: t.Expression,
): void {
    const [pattern, result] = call.node.arguments

    if (!t.isExpression(pattern)) ctx.abort()
    if (!t.isExpression(result)) ctx.abort()

    ctx.addBranch([
        optimizeCall(ctx, call.get("arguments.0"), value),
        optimizeCall(ctx, call.get("arguments.1"), value),
    ])
}
