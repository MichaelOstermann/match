import { describe, expect, expectTypeOf, test } from "vitest"
import { match } from "../src/match"

describe("shape", () => {
    describe("implementation", () => {
        test("should return matching shape", () => {
            const result = match.shape({ foo: 2 } as { foo: 1 | 2 | 3 })
                .case({ foo: 1 }, 1)
                .case({ foo: 2 }, 2)
                .case({ foo: 3 }, 3)
                .orThrow()

            expect(result).toBe(2)
        })
    })

    describe("types", () => {
        test("exhaustive patterns #1", () => {
            match.shape({ foo: "foo" as "foo" | "bar" })
                .case({ foo: "foo" }, true)
                .case({ foo: "bar" }, true)
                .orThrow()
        })

        test("exhaustive patterns #2", () => {
            match.shape({ foo: 0 as 0 | 1 })
                .case({ foo: 0 }, true)
                .case({ foo: 1 }, true)
                .orThrow()
        })

        test("exhaustive patterns #3", () => {
            match.shape({ foo: true as boolean })
                .case({ foo: true }, true)
                .case({ foo: false }, true)
                .orThrow()
        })

        test("exhaustive patterns #4", () => {
            match.shape({ foo: "foo" as "foo" | null })
                .case({ foo: "foo" }, true)
                .case({ foo: null }, true)
                .orThrow()
        })

        test("exhaustive patterns #5", () => {
            match.shape({ foo: "foo" } as { foo?: "foo" })
                .case({ foo: "foo" }, true)
                .case({ foo: undefined }, true)
                .orThrow()
        })

        test("exhaustive patterns #6", () => {
            match.shape({ foo: "foo" } as { foo: "foo" } | { bar: "bar" })
                .case({ foo: "foo" }, true)
                .case({ bar: "bar" }, true)
                .orThrow()
        })

        test("exhaustive patterns #7", () => {
            type ServerMessage =
                | { kind: "A" | "B" | "C", name: "A" }
                | { kind: "A" | "B" | "C", name: "B" }

            match
                .shape({ kind: "C", name: "B" } as ServerMessage)
                .case({ kind: "A", name: "A" }, true)
                .case({ kind: "B", name: "A" }, true)
                .case({ name: "A" }, true)
                .case({ name: "B" }, true)
                .orThrow()
        })

        test("exhaustive patterns #8", () => {
            const isNext = true as boolean
            const isPrev = true as boolean

            match
                .shape({ isNext, isPrev })
                .case({ isNext: false, isPrev: false }, true)
                .case({ isNext: true }, true)
                .case({ isPrev: true }, true)
                .orThrow()
        })

        test("non-exhaustive patterns #1", () => {
            match.shape({ foo: "foo" as "foo" | "bar" })
                .case({ foo: "foo" }, true)
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: "foo" as "foo" | "bar" })
                .case({ foo: "foo" }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "bar" }>()
                })
        })

        test("non-exhaustive patterns #2", () => {
            match.shape({ foo: "foo" as string })
                .case({ foo: "foo" }, true)
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: "foo" as string })
                .case({ foo: "foo" }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: string }>()
                })
        })

        test("non-exhaustive patterns #3", () => {
            match.shape({ foo: "foo" as string })
                .case({ foo: "foo" as string }, true)
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: "foo" as string })
                .case({ foo: "foo" as string }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: string }>()
                })
        })

        test("non-exhaustive patterns #4", () => {
            match.shape({ foo: true as boolean })
                .case({ foo: true }, true)
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: true as boolean })
                .case({ foo: true }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: false }>()
                })
        })

        test("non-exhaustive patterns #5", () => {
            match.shape({ foo: true as boolean })
                .case({ foo: true as boolean }, true)
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: true as boolean })
                .case({ foo: true as boolean }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: true } | { readonly foo: false }>()
                })
        })

        test("non-exhaustive patterns #6", () => {
            match.shape({ foo: 0 as 0 | 1 })
                .case({ foo: 0 }, true)
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: 0 as 0 | 1 })
                .case({ foo: 0 }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 1 }>()
                })
        })

        test("non-exhaustive patterns #7", () => {
            match.shape({ foo: 0 as number })
                .case({ foo: 0 }, true)
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: 0 as number })
                .case({ foo: 0 }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: number }>()
                })
        })

        test("non-exhaustive patterns #8", () => {
            match.shape({ foo: 0 as number })
                .case({ foo: 0 as number }, true)
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: 0 as number })
                .case({ foo: 0 as number }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: number }>()
                })
        })

        test("non-exhaustive patterns #9", () => {
            match.shape({ foo: "foo" as "foo" | null })
                .case({ foo: "foo" }, true)
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: "foo" as "foo" | null })
                .case({ foo: "foo" }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: null }>()
                })
        })

        test("non-exhaustive patterns #10", () => {
            match.shape({ foo: null as "foo" | null })
                .case({ foo: null }, true)
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: null as "foo" | null })
                .case({ foo: null }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                })
        })

        test("non-exhaustive patterns #11", () => {
            match.shape({ foo: "foo" } as { foo?: "foo" })
                .case({ foo: "foo" }, true)
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: "foo" } as { foo?: "foo" })
                .case({ foo: "foo" }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: undefined }>()
                })
        })

        test("non-exhaustive patterns #12", () => {
            match.shape({ foo: undefined } as { foo?: "foo" })
                .case({ foo: undefined }, true)
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: undefined } as { foo?: "foo" })
                .case({ foo: undefined }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                })
        })

        test("non-exhaustive patterns #13", () => {
            match.shape({ foo: "foo" } as { foo: "foo" } | { bar: "bar" })
                .case({ foo: "foo" }, true)
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: "foo" } as { foo: "foo" } | { bar: "bar" })
                .case({ foo: "foo" }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly bar: "bar" }>()
                })
        })

        test("duplicated patterns #1", () => {
            match.shape({ foo: "foo" as "foo" | "bar" })
                .case({ foo: "foo" }, true)
            // @ts-expect-error test case.
                .case({ foo: "foo" }, true)
        })

        test("duplicated patterns #2", () => {
            match.shape({ foo: "foo" as string })
                .case({ foo: "foo" }, true)
            // @ts-expect-error test case.
                .case({ foo: "foo" }, true)
        })

        test("duplicated patterns #3", () => {
            match.shape({ foo: 0 as 0 | 1 })
                .case({ foo: 0 }, true)
            // @ts-expect-error test case.
                .case({ foo: 0 }, true)
        })

        test("duplicated patterns #4", () => {
            match.shape({ foo: 0 as number })
                .case({ foo: 0 }, true)
            // @ts-expect-error test case.
                .case({ foo: 0 }, true)
        })

        test("duplicated patterns #5", () => {
            match.shape({ foo: true })
                .case({ foo: true }, true)
            // @ts-expect-error test case.
                .case({ foo: true }, true)
        })

        test("duplicated patterns #6", () => {
            match.shape({ foo: true as boolean })
                .case({ foo: true }, true)
            // @ts-expect-error test case.
                .case({ foo: true }, true)
        })

        test("duplicated patterns #7", () => {
            match.shape({ foo: null as string | null })
                .case({ foo: null }, true)
            // @ts-expect-error test case.
                .case({ foo: null }, true)
        })

        test("duplicated patterns #8", () => {
            match.shape({ foo: undefined } as { foo?: string })
                .case({ foo: undefined }, true)
            // @ts-expect-error test case.
                .case({ foo: undefined }, true)
        })

        test("invalid patterns #1", () => {
            match.shape({ foo: true })
            // @ts-expect-error test case.
                .case({ bar: true }, true)
        })

        test("invalid patterns #2", () => {
            match.shape({ foo: true })
            // @ts-expect-error test case.
                .case({ bar: true, baz: true }, true)
        })

        test("invalid patterns #3", () => {
            match.shape({ foo: ["foo"] })
            // @ts-expect-error test case.
                .case({ foo: ["foo"] }, true)
        })

        test("invalid patterns #4", () => {
            match.shape({ foo: true })
            // @ts-expect-error test case.
                .case({ foo: undefined }, true)
        })

        test("invalid patterns #5", () => {
            match.shape({ foo: true })
            // @ts-expect-error test case.
                .case({}, true)
        })

        test("invalid patterns #6", () => {
            // @ts-expect-error test case.
            match.shape({ foo: true } as { foo: boolean } | string)
        })
    })
})
