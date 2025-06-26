import { describe, expect, expectTypeOf, test } from "vitest"
import { match } from "../src/match"

describe("onCond", () => {
    describe("implementation", () => {
        test("should return matching predicate", () => {
            const result = match(2 as 1 | 2 | 3)
                .onCond(v => v === 1, () => "one")
                .onCond(v => v === 2, () => "two")
                .onCond(v => v === 3, () => "three")
                .or(null)

            expect(result).toBe("two")
        })
    })

    describe("types", () => {
        test("inferred return type", () => {
            const result = match(0 as 0 | 1 | 2)
                .onCond(v => v === 0, () => 0)
                .onCond(v => v === 1, () => "1")
                .onCond(v => v === 2, () => true)
                .or(null)

            expectTypeOf(result).toEqualTypeOf<number | string | boolean | null>()
        })

        test("strict return type", () => {
            match(0 as 0 | 1)
                .returnType<number>()
                .onCond(v => v === 0, () => 0)
                // @ts-expect-error test case.
                .onCond(v => v === 1, "1")
        })
    })
})
