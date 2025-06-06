import { describe, expect, expectTypeOf, test } from "vitest"
import { match } from "../src/match.js"

describe("or", () => {
    describe("implementation", () => {
        test("should return exhaustive match", () => {
            const result = match(0 as 0 | 1).case(0, true).or(false)
            expect(result).toBe(true)
        })

        test("should return fallback on non-exhaustive match", () => {
            const result = match(1 as 0 | 1).case(0, true).or(false)
            expect(result).toBe(false)
        })
    })

    describe("types", () => {
        test("inferred return type", () => {
            const result = match(0 as 0 | 1)
                .case(0, true)
                .or(null)

            expectTypeOf(result).toEqualTypeOf<boolean | null>()
        })

        test("strict return type", () => {
            match(0 as 0 | 1)
                .returnType<boolean>()
                .case(0, true)
                // @ts-expect-error test case.
                .or(null)

            match(0 as 0 | 1)
                .returnType<boolean>()
                .case(0, true)
                .or(false)
        })
    })
})
