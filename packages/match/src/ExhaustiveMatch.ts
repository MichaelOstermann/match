export class ExhaustiveMatch<T> {
    constructor(readonly value: T) {}

    returnType(): this {
        return this
    }

    case(): this {
        return this
    }

    onCase(): this {
        return this
    }

    shape(): this {
        return this
    }

    onShape(): this {
        return this
    }

    cond(): this {
        return this
    }

    onCond(): this {
        return this
    }

    orThrow(): T {
        return this.value
    }

    or(): any {
        return this.value
    }

    orElse(): any {
        return this.value
    }
}
