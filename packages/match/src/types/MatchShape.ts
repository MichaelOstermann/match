// Returns T if all fields from U are assignable, otherwise never.
export type MatchShape<T, U> = IfTrue<{
    [K in keyof U]: K extends keyof T
        ? U[K] extends T[K]
            ? true
            : false
        : false
}[keyof U], T, never>

type IfTrue<T, OnTrue, OnFalse> = true extends T ? OnTrue : OnFalse
