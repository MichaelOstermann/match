import type { ConditionalPick, OptionalKeysOf, Primitive, RequireAtLeastOne, RequiredKeysOf, Simplify } from "type-fest"

// Used to retrieve all the possible leftover shapes that can be matched.
export type ShapePatterns<T> = T extends unknown
    ? T extends object
        // - Remove all non-primitive fields, this library does not support recursive pattern matching.
        // - Expand optional fields into T | undefined.
        // - Require at least one field.
        ? AtLeastOneField<CleanOptionals<ConditionalPick<T, Primitive>>>
        : never
    : never

type AtLeastOneField<T> = RequireAtLeastOne<T, keyof T>

// Expands { foo?: boolean } into { foo: boolean | undefined }.
// Depending on tsconfig, { foo: undefined } might not be assignable to { foo?: boolean }
// otherwise, making it impossible to pattern match optional fields.
type CleanOptionals<T extends object> = Simplify<{
    [K in RequiredKeysOf<T>]: T[K]
} & {
    [K in OptionalKeysOf<T>]: T[K] | undefined
}>
