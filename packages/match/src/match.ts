import { NonExhaustiveMatch } from "./NonExhaustiveMatch.js"
import type { Match } from "./internals/Match.js"

export function match<const T>(value: T): Match<T> {
    return new NonExhaustiveMatch(value) as unknown as Match<T>
}
