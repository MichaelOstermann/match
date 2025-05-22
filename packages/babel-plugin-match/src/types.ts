import type * as t from "@babel/types"

export type LazyExpression = t.Expression | (() => t.Expression)

export type WellFormedObject = Omit<t.ObjectExpression, "properties">
    & { properties: WellFormedProperty[] }

export type WellFormedProperty = Omit<t.ObjectProperty, "key" | "value">
    & { key: t.Expression, value: t.Expression }
