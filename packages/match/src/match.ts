import type { Match } from "./internals/Match"
import { NonExhaustiveMatch } from "./NonExhaustiveMatch"

export function match<const T>(value: T): Match<T> {
    return new NonExhaustiveMatch(value) as unknown as Match<T>
}
