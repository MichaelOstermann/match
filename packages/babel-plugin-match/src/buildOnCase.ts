import type { NodePath } from "@babel/core"
import type { Context } from "./Context"
import * as t from "@babel/types"
import { optimizeCall } from "./optimizeCall"

export function buildOnCase(
    ctx: Context,
    call: NodePath<t.CallExpression>,
    value: t.Expression,
): void {
    const [pattern, result] = call.node.arguments

    ctx.assertExpression(pattern)
    ctx.assertExpression(result)

    ctx.addBranch([
        t.binaryExpression("===", value, pattern),
        optimizeCall(ctx, call.get("arguments.1"), value),
    ])
}
