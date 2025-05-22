import type { Primitive } from "type-fest"
import type { IsLiteral, IsTrue } from "./helpers.js"

// Used to check whether the unmatched value has any cases left.
export type HasCases<T> = IsTrue<T extends unknown
    ? T extends Primitive | null | undefined
        ? true
        : false
    : false>

// Used in .onCase(pattern, fn: (value) => …) to determine the type of
// `value` based on the provided `pattern`.
export type PickCase<T, U> = IsLiteral<U> extends true
    ? U
    : Extract<T, U>

// Used to remove the provided case from the unmatched value.
export type DropCase<T, U> = IsLiteral<U> extends true
    // We can only safely remove singleton sets.
    ? Exclude<T, U>
    : T

// Used to retrieve all the possible leftover cases that can be matched.
export type CasePatterns<T> = T extends unknown
    ? T extends Primitive
        ? T
        : never
    : never

// Used to keep track of which shapes have been matched already,
// so we can prevent duplicate patterns.
export type JoinMatchedCases<T, U> = IsLiteral<U> extends true
    ? T | U
    : T

// Excludes the cases that have already been pattern matched, to prevent matching duplicate patterns.
// Otherwise the following would be possible:
/*
    match("foo" as string)
        .case("foo", …)
        .case("foo", …)
*/
export type ExcludeMatchedCases<T, U> = Exclude<T, U>
