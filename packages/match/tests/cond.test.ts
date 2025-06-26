import { describe, expect, expectTypeOf, test } from "vitest"
import { match } from "../src/match"

describe("cond", () => {
    describe("implementation", () => {
        test("should return matching predicate", () => {
            const result = match(2 as 1 | 2 | 3)
                .cond(v => v === 1, "one")
                .cond(v => v === 2, "two")
                .cond(v => v === 3, "three")
                .or(null)

            expect(result).toBe("two")
        })
    })

    describe("types", () => {
        test("inferred return type", () => {
            const result = match(0 as 0 | 1 | 2)
                .cond(v => v === 0, 0)
                .cond(v => v === 1, "1")
                .cond(v => v === 2, true)
                .or(null)

            expectTypeOf(result).toEqualTypeOf<number | string | boolean | null>()
        })

        test("strict return type", () => {
            match(0 as 0 | 1)
                .returnType<number>()
                .cond(v => v === 0, 0)
                // @ts-expect-error test case.
                .cond(v => v === 1, "1")
        })
    })
})
