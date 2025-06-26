export class ExhaustiveMatch<T> {
    constructor(readonly value: T) {}

    case(): this {
        return this
    }

    cond(): this {
        return this
    }

    onCase(): this {
        return this
    }

    onCond(): this {
        return this
    }

    onShape(): this {
        return this
    }

    or(): any {
        return this.value
    }

    orElse(): any {
        return this.value
    }

    orThrow(): T {
        return this.value
    }

    returnType(): this {
        return this
    }

    shape(): this {
        return this
    }
}
