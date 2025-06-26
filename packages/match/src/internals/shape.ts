import type { ConditionalPick, OptionalKeysOf, Primitive, RequireAtLeastOne, RequiredKeysOf, Simplify } from "type-fest"
import type { IfTrue, IsLiteral, IsTrue } from "./helpers"

type PlainObject = { [Key in PropertyKey]: unknown }

// Used to check whether the unmatched value has any shapes left.
export type HasShapes<T> = IsTrue<T extends unknown
    ? T extends PlainObject
        ? true
        : false
    : false>

// Used in .onShape(pattern, fn: (value) => …) to determine the type of
// `value` based on the provided `pattern`.
export type PickShape<T, U> = T extends unknown
    ? T extends PlainObject
        ? Readonly<Simplify<MatchShape<T, U> & U>>
        : never
    : never

// Used to remove the provided shape from the unmatched value.
export type DropShape<T, U> = T extends unknown
    ? T extends PlainObject
        ? [MatchShape<T, U>] extends [never]
                ? T
                : Simplify<CompleteShape<T & {
                    [K in keyof U]: K extends keyof T
                        ? U[K] extends T[K]
                            // We can only safely remove singleton sets.
                            ? IsLiteral<U[K]> extends true
                                ? Exclude<T[K], U[K]>
                                : T[K]
                            : never
                        : never
                }>>
        : T
    : never

// Used to retrieve all the possible leftover shapes that can be matched.
export type ShapePatterns<T> = T extends unknown
    ? T extends PlainObject
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

// Returns T, unless any field was never.
type CompleteShape<T> = IfTrue<{
    [K in keyof T]: [T[K]] extends [never]
        ? true
        : false
}[keyof T], never, T>

// Expands { foo?: boolean } into { foo: boolean | undefined }.
// Depending on tsconfig, { foo: undefined } might not be assignable to { foo?: boolean }
// otherwise, making it impossible to pattern match optional fields.
type CleanOptionals<T extends object> = Simplify<{
    [K in RequiredKeysOf<T>]: T[K]
} & {
    [K in OptionalKeysOf<T>]: T[K] | undefined
}>

type AtLeastOneField<T> = RequireAtLeastOne<T, keyof T>

// Checks whether the given object as any field containing a literal.
type HasLiteralFields<T> = IsTrue<{
    [K in keyof T]: IsLiteral<T[K]>
}[keyof T]>
