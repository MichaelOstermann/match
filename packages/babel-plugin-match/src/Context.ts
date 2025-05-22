import * as t from "@babel/types"
import type { NodePath } from "@babel/core"
import { AbortError, getExpression } from "./helpers.js"
import type { LazyExpression } from "./types.js"

export class Context {
    path: NodePath<t.CallExpression>
    branches: [LazyExpression, LazyExpression][] = []
    before = new Set<() => void>()
    after = new Set<(expr: t.Expression) => t.Expression>()

    constructor(path: NodePath<t.CallExpression>) {
        this.path = path
    }

    abort(): never {
        throw new AbortError()
    }

    addBranch(branch: [LazyExpression, LazyExpression]): void {
        this.branches.push(branch)
    }

    onBeforeBuild(cb: () => void): void {
        this.before.add(cb)
    }

    onAfterBuild(cb: (expr: t.Expression) => t.Expression): void {
        this.after.add(cb)
    }

    assertExpression(value: t.Node | undefined): asserts value is t.Expression {
        if (!t.isExpression(value)) this.abort()
    }

    assertObjectExpression(value: t.Node | undefined): asserts value is t.ObjectExpression {
        if (!t.isObjectExpression(value)) this.abort()
    }

    build(path: NodePath, fallback: LazyExpression) {
        for (const cb of this.before) cb()

        let expression: t.Expression = getExpression(fallback)

        let i = this.branches.length
        while (i--) {
            const [test, result] = this.branches[i]!
            expression = t.conditionalExpression(
                getExpression(test),
                getExpression(result),
                expression,
            )
        }

        for (const cb of this.after) {
            expression = cb(expression)
        }

        path.replaceWith(expression)
    }
}
