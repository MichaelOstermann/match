import type { NodePath } from "@babel/core"
import type { LazyExpression } from "./types"
import * as t from "@babel/types"
import { AbortError, getExpression } from "./helpers"

export class Context {
    after = new Set<(expr: t.Expression) => t.Expression>()
    before = new Set<() => void>()
    branches: [LazyExpression, LazyExpression][] = []
    path: NodePath<t.CallExpression>

    constructor(path: NodePath<t.CallExpression>) {
        this.path = path
    }

    abort(): never {
        throw new AbortError()
    }

    addBranch(branch: [LazyExpression, LazyExpression]): void {
        this.branches.push(branch)
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

    onAfterBuild(cb: (expr: t.Expression) => t.Expression): void {
        this.after.add(cb)
    }

    onBeforeBuild(cb: () => void): void {
        this.before.add(cb)
    }
}
