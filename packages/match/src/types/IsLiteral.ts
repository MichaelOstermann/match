import type { IsLiteral as IsNonNullableLiteral } from "type-fest"

// `type-fests` definition of literals + null and undefined + TypeScript numeric enum members.
// type-fest's IsLiteral doesn't recognize numeric enum members (e.g., MyEnum.FOO=0) as literals,
// because `number extends MyEnum.FOO` evaluates to true in TypeScript's type system (numeric
// enums are structurally unsound). We detect them via template literal types: `${number}`
// represents the wide string of all numbers, while `${MyEnum.FOO}` resolves to a specific
// string like `"3"`, so `${number} extends ${MyEnum.FOO}` evaluates to false.
export type IsLiteral<T> = IsNonNullableLiteral<T> extends true
    ? true
    : T extends null | undefined
        ? true
        : T extends number
            ? `${number}` extends `${T}` ? false : true
            : false
