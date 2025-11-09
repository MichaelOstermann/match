import type { IsLiteral } from "./IsLiteral"

// Used to keep track of which values have been matched already,
// so we can prevent duplicate patterns.
export type JoinMatchedValues<T, U> = IsLiteral<U> extends true
    ? T | U
    : T
