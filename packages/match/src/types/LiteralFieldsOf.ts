import type { IsLiteral } from "./IsLiteral"

export type LiteralFieldsOf<T> = {
    [K in keyof T as IsLiteral<T[K]> extends true ? K : never]: T[K]
}
