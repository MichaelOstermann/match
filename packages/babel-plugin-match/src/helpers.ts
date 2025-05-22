import * as t from "@babel/types"
import type { NodePath } from "@babel/core"
import type { LazyExpression, WellFormedObject } from "./types.js"

export class AbortError extends Error {}

export function isAbortError(value: unknown): value is AbortError {
    return value instanceof AbortError
}

export function* findCallExpressions(path: NodePath): Generator<NodePath<t.CallExpression>> {
    let currentPath = path.parentPath
    while (currentPath) {
        if (currentPath.isCallExpression()) {
            yield currentPath
        }
        currentPath = currentPath.parentPath
    }
}

// Plain object with static keys.
export function isWellFormedObject(value: t.Node): value is WellFormedObject {
    if (!t.isObjectExpression(value)) return false
    for (const property of value.properties) {
        if (!t.isObjectProperty(property)) return false
        if (property.computed) return false
        if (!t.isExpression(property.key)) return false
        if (!t.isExpression(property.value)) return false
    }
    return true
}

export function equals(a: t.Expression, b: t.Expression): boolean {
    if (a.type === "Identifier" && b.type === "Identifier") return a.name === b.name
    if (a.type === "StringLiteral" && b.type === "StringLiteral") return a.value === b.value
    if (a.type === "NumericLiteral" && b.type === "NumericLiteral") return a.value === b.value
    return false
}

export function getExpression(lazyExpression: LazyExpression): t.Expression {
    return typeof lazyExpression === "function"
        ? lazyExpression()
        : lazyExpression
}

export function createThrowExpression(value: t.Expression): t.Expression {
    // `Pattern matching error: no pattern matches value ${JSON.stringify(value)}`
    const message = t.templateLiteral([
        t.templateElement({ raw: "Pattern matching error: no pattern matches value " }),
        t.templateElement({ raw: "" }),
    ], [
        t.callExpression(t.memberExpression(t.identifier("JSON"), t.identifier("stringify")), [value]),
    ])

    // (() => { throw new Error(...) })()
    const error = t.newExpression(t.identifier("Error"), [message])
    const throwStatement = t.throwStatement(error)
    return t.callExpression(t.arrowFunctionExpression([], t.blockStatement([
        throwStatement,
    ])), [])
}
