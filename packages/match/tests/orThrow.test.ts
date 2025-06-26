import { describe, expect, test } from "vitest"
import { match } from "../src/match"

describe("orThrow", () => {
    test("should return exhaustive match", () => {
        const result = match(0).case(0, true).orThrow()
        expect(result).toBe(true)
    })

    test("should throw on non-exhaustive match", () => {
        // @ts-expect-error test case.
        expect(() => match(0).orThrow())
            .toThrow("Pattern matching error: no pattern matches value 0")
    })
})
