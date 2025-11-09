import type { HasLiteralFields } from "./HasLiteralFields"

// Used to keep track of which shapes have been matched already,
// so we can prevent duplicate patterns.
export type JoinMatchedShapes<T, U> = HasLiteralFields<U> extends true
    ? T | U
    : T
