import type { NodePath } from "@babel/core"
import type * as t from "@babel/types"
import type { Context } from "./Context"
import { createThrowExpression } from "./helpers"

export function buildOrThrow(
    ctx: Context,
    call: NodePath<t.CallExpression>,
    value: t.Expression,
): void {
    ctx.build(call, createThrowExpression(value))
}
