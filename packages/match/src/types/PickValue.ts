import type { IsLiteral } from "./IsLiteral"

// Used in .onCase(pattern, fn: (value) => …) to determine the type of
// `value` based on the provided `pattern`.
export type PickValue<T, U> = IsLiteral<U> extends true
    ? U
    : Extract<T, U>
