import type { Primitive } from "type-fest"
import type { IsPlainObject } from "./types/IsPlainObject"
import type { ShapeMatcher } from "./types/ShapeMatcher"
import type { ShapeVariations } from "./types/ShapeVariations"
import type { ValueMatcher } from "./types/ValueMatcher"
import { Shape } from "./Shape"
import { Value } from "./Value"

export interface Match {
    <T extends Primitive | null | undefined>(value: T): ValueMatcher<T>
    shape: <T extends object>(value: IsPlainObject<T> extends true ? T : never) => ShapeMatcher<ShapeVariations<T>>
}

export const match = function (value: any) {
    return new Value(value) as any
} as Match

match.shape = function (value: any) {
    return new Shape(value) as any
}
