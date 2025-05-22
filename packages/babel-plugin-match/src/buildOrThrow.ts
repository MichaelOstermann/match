import type * as t from "@babel/types"
import type { NodePath } from "@babel/core"
import type { Context } from "./Context.js"
import { createThrowExpression } from "./helpers.js"

export function buildOrThrow(
    ctx: Context,
    call: NodePath<t.CallExpression>,
    value: t.Expression,
): void {
    ctx.build(call, createThrowExpression(value))
}
