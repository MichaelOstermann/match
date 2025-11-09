export class Exhaustive {
    constructor(readonly value: unknown) {}

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

    or(): any {
        return this.value
    }

    orElse(): any {
        return this.value
    }

    orThrow(): unknown {
        return this.value
    }

    returnType(): this {
        return this
    }
}
