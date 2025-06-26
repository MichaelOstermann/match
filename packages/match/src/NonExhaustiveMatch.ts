import { ExhaustiveMatch } from "./ExhaustiveMatch"

export class NonExhaustiveMatch<T> {
    constructor(readonly value: T) {}

    case(value: any, result: any): any {
        const v = this.value
        if (value !== v) return this
        return new ExhaustiveMatch(result)
    }

    cond(predicate: any, result: any): any {
        const v = this.value
        if (!predicate(v)) return this
        return new ExhaustiveMatch(result)
    }

    onCase(value: any, fn: any): any {
        const v = this.value
        if (value !== v) return this
        return new ExhaustiveMatch(fn(value))
    }

    onCond(predicate: any, fn: any): any {
        const v = this.value
        if (!predicate(v)) return this
        return new ExhaustiveMatch(fn(v))
    }

    onShape(value: any, fn: any): any {
        const v = this.value as any
        if (!(value && typeof value === "object")) return this
        for (const key in value) {
            if (value[key] !== v[key]) return this
        }
        return new ExhaustiveMatch(fn(v))
    }

    or(fallback: any): any {
        return fallback
    }

    orElse(fallback: any): any {
        return fallback(this.value)
    }

    orThrow(): never {
        throw new Error(`Pattern matching error: no pattern matches value ${JSON.stringify(this.value)}`)
    }

    returnType(): this {
        return this
    }

    shape(value: any, result: any): any {
        const v = this.value as any
        if (!(value && typeof value === "object")) return this
        for (const key in value) {
            if (value[key] !== v[key]) return this
        }
        return new ExhaustiveMatch(result)
    }
}
