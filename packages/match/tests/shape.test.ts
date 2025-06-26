import { describe, expect, expectTypeOf, test } from "vitest"
import { match } from "../src/match"

describe("shape", () => {
    describe("implementation", () => {
        test("should return matching shape", () => {
            const result = match({ foo: 2 } as { foo: 1 | 2 | 3 })
                .shape({ foo: 1 }, 1)
                .shape({ foo: 2 }, 2)
                .shape({ foo: 3 }, 3)
                .orThrow()

            expect(result).toBe(2)
        })
    })

    describe("types", () => {
        test("exhaustive patterns #1", () => {
            match({ foo: "foo" as "foo" | "bar" })
                .shape({ foo: "foo" }, true)
                .shape({ foo: "bar" }, true)
                .orThrow()
        })

        test("exhaustive patterns #2", () => {
            match({ foo: "foo" as "foo" | "bar" })
                .shape({ foo: "foo" as "foo" | "bar" }, true)
                .orThrow()
        })

        test("exhaustive patterns #3", () => {
            match({ foo: 0 as 0 | 1 })
                .shape({ foo: 0 }, true)
                .shape({ foo: 1 }, true)
                .orThrow()
        })

        test("exhaustive patterns #4", () => {
            match({ foo: 0 as 0 | 1 })
                .shape({ foo: 0 as 0 | 1 }, true)
                .orThrow()
        })

        test("exhaustive patterns #5", () => {
            match({ foo: true as boolean })
                .shape({ foo: true }, true)
                .shape({ foo: false }, true)
                .orThrow()
        })

        test("exhaustive patterns #6", () => {
            match({ foo: "foo" as "foo" | null })
                .shape({ foo: "foo" }, true)
                .shape({ foo: null }, true)
                .orThrow()
        })

        test("exhaustive patterns #7", () => {
            match({ foo: "foo" as "foo" | null })
                .shape({ foo: "foo" as "foo" | null }, true)
                .orThrow()
        })

        test("exhaustive patterns #8", () => {
            match({ foo: "foo" } as { foo?: "foo" })
                .shape({ foo: "foo" }, true)
                .shape({ foo: undefined }, true)
                .orThrow()
        })

        test("exhaustive patterns #9", () => {
            match({ foo: "foo" } as { foo?: "foo" })
                .shape({ foo: "foo" as "foo" | undefined }, true)
                .orThrow()
        })

        test("exhaustive patterns #10", () => {
            match({ foo: "foo" } as { foo: "foo" } | { bar: "bar" })
                .shape({ foo: "foo" }, true)
                .shape({ bar: "bar" }, true)
                .orThrow()
        })

        test("non-exhaustive patterns #1", () => {
            match({ foo: "foo" as "foo" | "bar" })
                .shape({ foo: "foo" }, true)
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: "foo" as "foo" | "bar" })
                .shape({ foo: "foo" }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "bar" }>()
                })
        })

        test("non-exhaustive patterns #2", () => {
            match({ foo: "foo" as string })
                .shape({ foo: "foo" }, true)
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: "foo" as string })
                .shape({ foo: "foo" }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: string }>()
                })
        })

        test("non-exhaustive patterns #3", () => {
            match({ foo: "foo" as string })
                .shape({ foo: "foo" as string }, true)
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: "foo" as string })
                .shape({ foo: "foo" as string }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: string }>()
                })
        })

        test("non-exhaustive patterns #4", () => {
            match({ foo: true as boolean })
                .shape({ foo: true }, true)
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: true as boolean })
                .shape({ foo: true }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: false }>()
                })
        })

        test("non-exhaustive patterns #5", () => {
            match({ foo: true as boolean })
                .shape({ foo: true as boolean }, true)
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: true as boolean })
                .shape({ foo: true as boolean }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: boolean }>()
                })
        })

        test("non-exhaustive patterns #6", () => {
            match({ foo: 0 as 0 | 1 })
                .shape({ foo: 0 }, true)
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: 0 as 0 | 1 })
                .shape({ foo: 0 }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 1 }>()
                })
        })

        test("non-exhaustive patterns #7", () => {
            match({ foo: 0 as number })
                .shape({ foo: 0 }, true)
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: 0 as number })
                .shape({ foo: 0 }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: number }>()
                })
        })

        test("non-exhaustive patterns #8", () => {
            match({ foo: 0 as number })
                .shape({ foo: 0 as number }, true)
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: 0 as number })
                .shape({ foo: 0 as number }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: number }>()
                })
        })

        test("non-exhaustive patterns #9", () => {
            match({ foo: "foo" as "foo" | null })
                .shape({ foo: "foo" }, true)
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: "foo" as "foo" | null })
                .shape({ foo: "foo" }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: null }>()
                })
        })

        test("non-exhaustive patterns #10", () => {
            match({ foo: null as "foo" | null })
                .shape({ foo: null }, true)
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: null as "foo" | null })
                .shape({ foo: null }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                })
        })

        test("non-exhaustive patterns #11", () => {
            match({ foo: "foo" } as { foo?: "foo" })
                .shape({ foo: "foo" }, true)
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: "foo" } as { foo?: "foo" })
                .shape({ foo: "foo" }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: undefined }>()
                })
        })

        test("non-exhaustive patterns #12", () => {
            match({ foo: undefined } as { foo?: "foo" })
                .shape({ foo: undefined }, true)
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: undefined } as { foo?: "foo" })
                .shape({ foo: undefined }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                })
        })

        test("non-exhaustive patterns #13", () => {
            match({ foo: "foo" } as { foo: "foo" } | { bar: "bar" })
                .shape({ foo: "foo" }, true)
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: "foo" } as { foo: "foo" } | { bar: "bar" })
                .shape({ foo: "foo" }, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly bar: "bar" }>()
                })
        })

        test("duplicated patterns #1", () => {
            match({ foo: "foo" as "foo" | "bar" })
                .shape({ foo: "foo" }, true)
            // @ts-expect-error test case.
                .shape({ foo: "foo" }, true)
        })

        test("duplicated patterns #2", () => {
            match({ foo: "foo" as string })
                .shape({ foo: "foo" }, true)
            // @ts-expect-error test case.
                .shape({ foo: "foo" }, true)
        })

        test("duplicated patterns #3", () => {
            match({ foo: 0 as 0 | 1 })
                .shape({ foo: 0 }, true)
            // @ts-expect-error test case.
                .shape({ foo: 0 }, true)
        })

        test("duplicated patterns #4", () => {
            match({ foo: 0 as number })
                .shape({ foo: 0 }, true)
            // @ts-expect-error test case.
                .shape({ foo: 0 }, true)
        })

        test("duplicated patterns #5", () => {
            match({ foo: true })
                .shape({ foo: true }, true)
            // @ts-expect-error test case.
                .shape({ foo: true }, true)
        })

        test("duplicated patterns #6", () => {
            match({ foo: true as boolean })
                .shape({ foo: true }, true)
            // @ts-expect-error test case.
                .shape({ foo: true }, true)
        })

        test("duplicated patterns #7", () => {
            match({ foo: null as string | null })
                .shape({ foo: null }, true)
            // @ts-expect-error test case.
                .shape({ foo: null }, true)
        })

        test("duplicated patterns #8", () => {
            match({ foo: undefined } as { foo?: string })
                .shape({ foo: undefined }, true)
            // @ts-expect-error test case.
                .shape({ foo: undefined }, true)
        })

        test("invalid patterns #1", () => {
            match({ foo: true })
            // @ts-expect-error test case.
                .shape({ bar: true }, true)
        })

        test("invalid patterns #2", () => {
            match({ foo: true })
            // @ts-expect-error test case.
                .shape({ bar: true, baz: true }, true)
        })

        test("invalid patterns #3", () => {
            match({ foo: ["foo"] })
            // @ts-expect-error test case.
                .shape({ foo: ["foo"] }, true)
        })

        test("invalid patterns #4", () => {
            match({ foo: true })
            // @ts-expect-error test case.
                .shape({ foo: undefined }, true)
        })

        test("invalid patterns #5", () => {
            match({ foo: true })
            // @ts-expect-error test case.
                .shape({}, true)
        })

        test("invalid patterns #6", () => {
            match({ foo: true } as { foo: boolean } | string)
            // @ts-expect-error test case.
                .shape("foo", true)
        })
    })
})
