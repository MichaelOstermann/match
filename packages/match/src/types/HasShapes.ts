import type { IsPlainObject } from "./IsPlainObject"
import type { IsTrue } from "./IsTrue"

// Used to check whether the unmatched value has any shapes left.
export type HasShapes<T> = IsTrue<T extends unknown
    ? IsPlainObject<T> extends true
        ? true
        : false
    : false>
