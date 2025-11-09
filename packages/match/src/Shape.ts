import { Exhaustive } from "./Exhaustive"
import { Value } from "./Value"

export class Shape extends Value {
    override case(value: object, result: unknown): Shape | Exhaustive {
        for (const key in value) {
            if ((this.value as any)[key] !== (value as any)[key]) return this
        }
        return new Exhaustive(result)
    }

    override onCase(value: object, result: (value: unknown) => unknown): Shape | Exhaustive {
        for (const key in value) {
            if ((this.value as any)[key] !== (value as any)[key]) return this
        }
        return new Exhaustive(result(this.value))
    }

    override orThrow(): never {
        throw new Error(`Pattern matching error: no pattern matches value ${JSON.stringify(this.value)}`)
    }
}
