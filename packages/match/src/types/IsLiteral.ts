import type { IsLiteral as IsNonNullableLiteral } from "type-fest"

// `type-fests` definition of literals + null and undefined.
export type IsLiteral<T> = IsNonNullableLiteral<T> extends true
    ? true
    : T extends null | undefined
        ? true
        : false
