import { Exhaustive } from "./Exhaustive"

export class Value {
    constructor(readonly value: unknown) {}

    case(value: unknown, result: unknown): Value | Exhaustive {
        const v = this.value
        if (value !== v) return this
        return new Exhaustive(result)
    }

    cond(predicate: (value: unknown) => boolean, result: unknown): Value | Exhaustive {
        if (!predicate(this.value)) return this
        return new Exhaustive(result)
    }

    onCase(value: unknown, result: (value: unknown) => unknown): Value | Exhaustive {
        const v = this.value
        if (value !== v) return this
        return new Exhaustive(result(value))
    }

    onCond(predicate: (value: unknown) => boolean, result: (value: unknown) => unknown): Value | Exhaustive {
        if (!predicate(this.value)) return this
        return new Exhaustive(result(this.value))
    }

    or(fallback: unknown): unknown {
        return fallback
    }

    orElse(fallback: (value: unknown) => unknown): unknown {
        return fallback(this.value)
    }

    orThrow(): never {
        throw new Error(`Pattern matching error: no pattern matches value ${this.value}`)
    }

    returnType(): this {
        return this
    }
}
