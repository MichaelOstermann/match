import type { IsUnion, Primitive, UnionToTuple } from "type-fest"

export type ShapeVariations<T> = ExplodeValues<T, ExplodeKeys<T>>

type ExplodeValues<T, K> = K extends [infer Head, ...infer Tail]
    ? Head extends keyof T
        ? ExplodeValues<ExplodeValue<T, Head>, Tail>
        : never
    : T

type ExplodeValue<T, K extends keyof T, U = UnionToTuple<T[K]>, V = never> = U extends [infer Head, ...infer Tail]
    ? ExplodeValue<T, K, Tail, V | (T & Record<K, Head>)>
    : V

type ExplodeKeys<T> = UnionToTuple<keyof {
    [K in keyof T as T[K] extends Primitive | null | undefined ? IsUnion<T[K]> extends true ? K : never : never]: true
}>
