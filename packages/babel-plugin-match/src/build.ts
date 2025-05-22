import * as t from "@babel/types"
import type { NodePath } from "@babel/core"
import { findCallExpressions, isAbortError } from "./helpers.js"
import { buildCase } from "./buildCase.js"
import { Context } from "./Context.js"
import { buildOnCase } from "./buildOnCase.js"
import { buildOr } from "./buildOr.js"
import { buildShape } from "./buildShape.js"
import { buildCond } from "./buildCond.js"
import { buildOnCond } from "./buildOnCond.js"
import { buildOrElse } from "./buildOrElse.js"
import { buildOrThrow } from "./buildOrThrow.js"
import { buildOnShape } from "./buildOnShape.js"

/*
    This takes a path to a `match(value)` call, finds each method such as `.case(a, b)`
    and then tries to optimize each step.

    The optimizations are kept aside until we find a finalizing method, such as `.orThrow()`,
    which will replace the entire `match(value)` chain with an optimized representation.

    Sometimes we encounter something that can not be optimized, unless we "hoist" `value`
    from `match(value)` in some way.

    One such example might be:

        match(getObject())
            .cond(predicateA, 0)
            .cond(predicateB, 1)
            .or(2)

    Which would result with:

        predicateA(getObject())
            ? 0
            // Calling `getObject()` multiple times is really bad.
            : predicateB(getObject())
            ? 1
            : 2

    In such cases we throw an `AbortError`, which is handled here in this `build` function.
    This is done for convenience, so we don't have to work with nullable values everywhere.

    If an AbortError is thrown, then we try to build again, but this time replacing `value`
    from `match(value)` with an identifier:

        match(_value)
            .cond(predicateA, 0)
            .cond(predicateB, 1)
            .or(2)

    Which gets optimized to:

        predicateA(_value)
            ? 0
            : predicateB(_value)
            ? 1
            : 2

    And then finally wrap everything with an IIFE:

    ((_value) => predicateA(_value) ...)(getObject())
*/
export function build(
    path: NodePath<t.CallExpression>,
    _value: t.Expression,
    hoist: boolean = false,
): void {
    let value = _value
    const ctx = new Context(path)

    if (hoist) {
        const id = path.scope.generateUidIdentifier("value")
        value = id
        ctx.onAfterBuild((expr) => {
            return t.callExpression(t.arrowFunctionExpression([id], expr), [_value])
        })
    }

    try {
        // Walk up to collect all method calls and process each one.
        for (const call of findCallExpressions(path)) {
            const node = call.node
            if (!t.isMemberExpression(node.callee)) continue
            if (!t.isIdentifier(node.callee.property)) return ctx.abort()

            const name = node.callee.property.name

            // Type-level only method, ignore.
            if (name === "returnType") continue

            if (name === "case") buildCase(ctx, call, value)
            else if (name === "onCase") buildOnCase(ctx, call, value)
            else if (name === "shape") buildShape(ctx, call, value)
            else if (name === "onShape") buildOnShape(ctx, call, value)
            else if (name === "cond") buildCond(ctx, call, value)
            else if (name === "onCond") buildOnCond(ctx, call, value)
            else if (name === "or") buildOr(ctx, call, value)
            else if (name === "orElse") buildOrElse(ctx, call, value)
            else if (name === "orThrow") buildOrThrow(ctx, call, value)

            // Unrecognized name, abort.
            else ctx.abort()
        }
    }
    catch (error) {
        // Some other exception occured, rethrow.
        if (!isAbortError(error)) throw error

        // We already tried hoisting, leave this `match` call untouched.
        if (hoist) return

        // The idea of hoisting is to turn `value` from `match(value)`
        // into an identifier. Skip if `value` already was an identifier.
        if (t.isIdentifier(value)) return

        // Failed to optimize `match` call, try again with hoisting.
        build(path, value, true)
    }
}
