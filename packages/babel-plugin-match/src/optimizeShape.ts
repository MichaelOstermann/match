import type { Context } from "./Context"
import * as t from "@babel/types"
import { equals, isWellFormedObject } from "./helpers"

export function optimizeShape(
    ctx: Context,
    pattern: t.ObjectExpression,
    value: t.Expression,
): t.Expression {
    /*
        Optimize:
            match({ foo: a })
                .shape({ foo: b })

        Into:
            a === b
    */
    if (isWellFormedObject(value) && isWellFormedObject(pattern)) {
        let result

        for (const propertyRight of pattern.properties) {
            const propertyLeft = value.properties.find(propertyLeft => equals(
                propertyLeft.key,
                propertyRight.key,
            ))

            // This property does not exist in the matched value, abort.
            if (!propertyLeft) ctx.abort()

            const test = t.binaryExpression("===", propertyLeft.value, propertyRight.value)

            result = result
                ? t.logicalExpression("&&", result, test)
                : test
        }

        if (!result) ctx.abort()
        return result
    }

    /*
        Optimize:
            match(value)
                .shape({ foo: a })

        Into:
            value
            && typeof value === "object"
            && value.foo === a
    */
    if (t.isIdentifier(value) && isWellFormedObject(pattern)) {
        // value && typeof value === "object"
        let result: t.Expression = t.logicalExpression(
            "&&",
            value,
            t.binaryExpression("===", t.unaryExpression("typeof", value), t.stringLiteral("object")),
        )

        for (const property of pattern.properties) {
            const isComputed = property.computed
                || t.isStringLiteral(property.key)
                || t.isNumericLiteral(property.key)

            // v[key] === value
            const test = t.binaryExpression("===", t.memberExpression(value, property.key, isComputed), property.value)
            result = t.logicalExpression("&&", result, test)
        }

        return result
    }

    ctx.abort()
}
