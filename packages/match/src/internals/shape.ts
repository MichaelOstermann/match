import type { ConditionalPick, OptionalKeysOf, Primitive, RequireAtLeastOne, RequiredKeysOf, Simplify, UnionToTuple } from "type-fest"
import type { IsUnion } from "type-fest/source/internal"
import type { IfTrue, IsLiteral, IsTrue } from "./helpers"

type IsPlainObject<T> = T extends object
    ? T extends any[]
        ? false
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        : T extends Function
            ? false
            : true
    : false

// Used to check whether the unmatched value has any shapes left.
export type HasShapes<T> = IsTrue<T extends unknown
    ? IsPlainObject<T> extends true
        ? true
        : false
    : false>

// Used in .onShape(pattern, fn: (value) => …) to determine the type of
// `value` based on the provided `pattern`.
export type PickShape<T, U> = T extends unknown
    ? IsPlainObject<T> extends true
        ? Readonly<Simplify<MatchShape<T, U> & U>>
        : never
    : never

// Used to remove the provided shape from the unmatched value.
export type DropShape<T, U> = T extends unknown
    ? IsPlainObject<T> extends true
        ? [MatchShape<T, U>] extends [never]
                ? T
                : DropLiteralFields<T, U>
        : T
    : never

// DropLiteralFields<{ foo: boolean, bar: boolean }, { foo: true, bar: false }>
// { foo: false, bar: true }
type DropLiteralFields<T, U> = HasLiteralFields<U> extends true
    ? LiteralFieldsOf<U> extends infer V
        ? Exclude<ShapeVariations<T, V>, V>
        : never
    : T

// ShapeVariations<{ foo: boolean, bar: boolean }, { foo: true, bar: false }>
// { foo: true, bar: true } | { foo: false, bar: false } | { foo: true, bar: false } | { foo: false, bar: true }
type ShapeVariations<T, U, V = UnionKeysOf<T, U>> = V extends [infer Key, ...infer Rest]
    ? Key extends keyof T
        ? ShapeVariations<FieldVariations<T, Key>, U, Rest>
        : never
    : T

// FieldVariations<{ foo: boolean, bar: boolean }, "foo">
// { foo: true, bar: boolean } | { foo: false, bar: boolean }
type FieldVariations<T, K extends keyof T, V = UnionToTuple<T[K]>> = V extends [infer Value, ...infer Rest]
    ? T & Record<K, Value> | FieldVariations<T, K, Rest>
    : never

// Takes two records T and U, returns shared keys where T[K] is a union and U[K] is a literal.
type UnionKeysOf<T, U> = UnionToTuple<keyof {
    [K in keyof U]: K extends keyof T
        ? IsLiteral<U[K]> extends true
            ? IsUnion<T[K]> extends true
                ? K
                : never
            : never
        : never
}>

// Used to retrieve all the possible leftover shapes that can be matched.
export type ShapePatterns<T> = T extends unknown
    ? T extends object
        // - Remove all non-primitive fields, this library does not support recursive pattern matching.
        // - Expand optional fields into T | undefined.
        // - Require at least one field.
        ? AtLeastOneField<CleanOptionals<ConditionalPick<T, Primitive>>>
        : never
    : never

// Used to keep track of which shapes have been matched already,
// so we can prevent duplicate patterns.
export type JoinMatchedShapes<T, U> = HasLiteralFields<U> extends true
    ? T | U
    : T

// Excludes the shapes that have already been pattern matched, to prevent matching duplicate patterns.
// Otherwise the following would be possible:
/*
    match({ foo: true } as { foo: boolean })
        .shape({ foo: true }, …)
        .shape({ foo: true }, …)
*/
export type ExcludeMatchedShapes<T, U> = [U] extends [never]
    ? T
    : U extends unknown
        ? [MatchShape<U, T>] extends [never]
                ? T
                : never
        : never

// Returns T if all fields from U are assignable, otherwise never.
type MatchShape<T, U> = IfTrue<{
    [K in keyof U]: K extends keyof T
        ? U[K] extends T[K]
            ? true
            : false
        : false
}[keyof U], T, never>

// Expands { foo?: boolean } into { foo: boolean | undefined }.
// Depending on tsconfig, { foo: undefined } might not be assignable to { foo?: boolean }
// otherwise, making it impossible to pattern match optional fields.
type CleanOptionals<T extends object> = Simplify<{
    [K in RequiredKeysOf<T>]: T[K]
} & {
    [K in OptionalKeysOf<T>]: T[K] | undefined
}>

type LiteralFieldsOf<T> = {
    [K in keyof T as IsLiteral<T[K]> extends true ? K : never]: T[K]
}

// Checks whether the given object as any field containing a literal.
type HasLiteralFields<T> = [keyof LiteralFieldsOf<T>] extends [never] ? false : true

type AtLeastOneField<T> = RequireAtLeastOne<T, keyof T>
