import type { LiteralFieldsOf } from "./LiteralFieldsOf"

// Checks whether the given object as any field containing a literal.
export type HasLiteralFields<T> = [keyof LiteralFieldsOf<T>] extends [never] ? false : true
