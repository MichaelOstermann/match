import type { NodePath } from "@babel/core"
import type { Context } from "./Context"
import type { LazyExpression, WellFormedObject } from "./types"
import * as t from "@babel/types"
import { equals, isWellFormedObject } from "./helpers"

type ParsedFn = {
    body: NodePath<t.Expression> | NodePath<t.BlockStatement> | undefined
    hasParams: boolean
    param: NodePath<t.Identifier> | undefined
}

export function optimizeCall(
    ctx: Context,
    pattern: NodePath,
    value: t.Expression,
): LazyExpression {
    // match(a).cond(b) => b(a)
    if (t.isIdentifier(value) && pattern.isIdentifier())
        return t.callExpression(pattern.node, [value])

    if (!pattern.isFunctionExpression() && !pattern.isArrowFunctionExpression())
        ctx.abort()

    const { body, hasParams, param } = parseFunction(pattern)

    // match(a).cond(() => {}, b) => undefined
    // match(a).cond(() => { return }, b) => undefined
    if (!hasParams && !body)
        return t.identifier("undefined")

    // match(a).cond(() => foo) => foo
    // match(a).cond(() => { return foo }) => foo
    if (!hasParams && body?.isExpression())
        return body.node

    // match(a).cond(() => {…}) => (() => {…})()
    if (!hasParams && body?.isBlockStatement())
        return t.callExpression(pattern.node, [])

    // match(a).cond((b) => {…}) => ((b) => {…})(a)
    if (param && body?.isBlockStatement())
        return t.callExpression(pattern.node, [value])

    // match(a).cond((b) => b.c) => a.c
    if (param && body?.isExpression() && t.isIdentifier(value))
        return replaceIdentifierReferences(ctx, body, param.node, value)

    // match({ a: b }).cond((c) => c.d) => b.d
    if (param && body?.isExpression() && isWellFormedObject(value))
        return replaceObjectReferences(ctx, body, param.node, value)

    ctx.abort()
}

// The goal is to replace something like:
// match(a).cond((b) => b.c === true, …)
// with:
// a.c === true ? … : …
function replaceIdentifierReferences(
    ctx: Context,
    body: NodePath<t.Expression>,
    param: t.Identifier,
    value: t.Identifier,
): () => t.Expression {
    body.traverse({
        Identifier(p) {
            // Fast check for irrelevant identifiers.
            if (p.node.name !== param.name) return

            // Check if this identifier is a reference to our parameter.
            const binding = p.scope.getBinding(p.node.name)
            if (binding?.identifier !== param) return

            // Running `replaceWith` now will result with the original code being transformed,
            // regardless of whether other still pending checks succeed or not.
            // We have to put this aside until we could confirm that all other methods
            // can be optimized, if not then we don't want to touch the code.
            ctx.onBeforeBuild(() => p.replaceWith(value))
        },
    })

    // const path = foo
    // ctx.onBeforeBuild(() => path.replaceWith(bar))
    // return path.node
    // ^ We could be returning a stale reference here, so we have to do this lazily.
    return () => body.node
}

// The goal is to replace something like:
// match({ a: b }).cond((c) => c.a === true, …)
// with:
// b === true ? … : …
function replaceObjectReferences(
    ctx: Context,
    body: NodePath<t.Expression>,
    param: t.Identifier,
    value: WellFormedObject,
): () => t.Expression {
    body.traverse({
        Identifier(p) {
            // Fast check for irrelevant identifiers.
            if (p.node.name !== param.name) return

            // Check if this identifier is a reference to our parameter.
            const binding = p.scope.getBinding(p.node.name)
            if (binding?.identifier !== param) return

            if (!t.isMemberExpression(p.parent)) ctx.abort()
            const member = p.parent.property
            if (!t.isExpression(member)) ctx.abort()

            const property = value.properties.find(property => equals(
                member,
                property.key,
            ))

            if (!property) ctx.abort()

            // Running `replaceWith` now will result with the original code being transformed,
            // regardless of whether other still pending checks succeed or not.
            // We have to put this aside until we could confirm that all other methods
            // can be optimized, if not then we don't want to touch the code.
            ctx.onBeforeBuild(() => p.parentPath.replaceWith(property.value))
        },
    })

    // const path = foo
    // ctx.onBeforeBuild(() => path.replaceWith(bar))
    // return path.node
    // ^ We could be returning a stale reference here, so we have to do this lazily.
    return () => body.node
}

function parseFunction(
    pattern: NodePath<t.ArrowFunctionExpression> | NodePath<t.FunctionExpression>,
): ParsedFn {
    return {
        body: parseBody(pattern),
        hasParams: pattern.node.params.length > 0,
        param: parseParam(pattern),
    }
}

function parseParam(
    pattern: NodePath<t.ArrowFunctionExpression> | NodePath<t.FunctionExpression>,
): NodePath<t.Identifier> | undefined {
    if (pattern.node.params.length !== 1) return
    const param = pattern.get("params.0")
    if (Array.isArray(param)) return
    return param.isIdentifier() ? param : undefined
}

function parseBody(
    pattern: NodePath<t.ArrowFunctionExpression> | NodePath<t.FunctionExpression>,
): NodePath<t.Expression> | NodePath<t.BlockStatement> | undefined {
    const body = pattern.get("body")
    if (Array.isArray(body)) return

    if (body.isExpression())
        return body

    if (body.isBlockStatement() && body.get("body.0").isReturnStatement() && body.get("body.0.argument").isExpression())
        return body.get("body.0.argument") as NodePath<t.Expression>

    if (body.isBlockStatement())
        return body

    return undefined
}
