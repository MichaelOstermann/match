import type { IsUnion } from "type-fest"
import type { IsLiteral } from "./IsLiteral"

// Used to remove the provided case from the unmatched value.
export type DropValue<T, U> = IsUnion<U> extends false
    ? IsLiteral<U> extends true
    // We can only safely remove singleton sets.
        ? Exclude<T, U>
        : T
    : T
