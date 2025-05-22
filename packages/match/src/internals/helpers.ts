import type { IsLiteral as IsNonNullableLiteral } from "type-fest"

export type IsTrue<T> = true extends T ? true : false
export type IfTrue<T, OnTrue, OnFalse> = true extends T ? OnTrue : OnFalse
export type Union<A, B> = [B] extends [A] ? A : [A] extends [B] ? B : A | B

// `type-fests` definition of literals + null and undefined.
export type IsLiteral<T> = IsNonNullableLiteral<T> extends true
    ? true
    : T extends null | undefined
        ? true
        : false

// @ts-expect-error ignore
export interface MatchError<i> { __: never }
