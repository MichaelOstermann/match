import type { IsEqual } from "type-fest"

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
        ? IsEqual<T, U> extends true
            ? never
            : T
        : never
