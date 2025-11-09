import type { IsPlainObject } from "./IsPlainObject"
import type { MatchShape } from "./MatchShape"

// Used in .onCase(pattern, fn: (value) => …) to determine the type of
// `value` based on the provided `pattern`.
export type PickShape<T, U> = T extends unknown
    ? IsPlainObject<T> extends true
        ? Readonly<MatchShape<T, U> & U>
        : never
    : never
