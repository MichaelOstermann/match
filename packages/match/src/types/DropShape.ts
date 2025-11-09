import type { HasLiteralFields } from "./HasLiteralFields"
import type { IsPlainObject } from "./IsPlainObject"
import type { LiteralFieldsOf } from "./LiteralFieldsOf"
import type { MatchShape } from "./MatchShape"

// Used to remove the provided shape from the unmatched value.
export type DropShape<T, U> = T extends unknown
    ? IsPlainObject<T> extends true
        ? [MatchShape<T, U>] extends [never]
                ? T
                : DropLiteralFields<T, U>
        : T
    : never

// DropLiteralFields<{ foo: boolean, bar: boolean }, { foo: true, bar: false }>
// { foo: false, bar: true }
type DropLiteralFields<T, U> = HasLiteralFields<U> extends true
    ? LiteralFieldsOf<U> extends infer V
        ? Exclude<T, V>
        : never
    : T
