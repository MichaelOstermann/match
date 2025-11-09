import { describe, expect, expectTypeOf, test } from "vitest"
import { match } from "../src/match"

describe("onShape", () => {
    describe("implementation", () => {
        test("should return matching shape", () => {
            const result = match.shape({ foo: 2 } as { foo: 1 | 2 | 3 })
                .onCase({ foo: 1 }, () => 1)
                .onCase({ foo: 2 }, () => 2)
                .onCase({ foo: 3 }, () => 3)
                .orThrow()

            expect(result).toBe(2)
        })
    })

    describe("types", () => {
        test("exhaustive patterns #1", () => {
            match.shape({ foo: "foo" as "foo" | "bar" })
                .onCase({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .onCase({ foo: "bar" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "bar" }>()
                    return true
                })
                .orThrow()
        })

        test("exhaustive patterns #2", () => {
            match.shape({ foo: 0 as 0 | 1 })
                .onCase({ foo: 0 }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 0 }>()
                    return true
                })
                .onCase({ foo: 1 }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 1 }>()
                    return true
                })
                .orThrow()
        })

        test("exhaustive patterns #3", () => {
            match.shape({ foo: true as boolean })
                .onCase({ foo: true }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: true }>()
                    return true
                })
                .onCase({ foo: false }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: false }>()
                    return true
                })
                .orThrow()
        })

        test("exhaustive patterns #4", () => {
            match.shape({ foo: "foo" as "foo" | null })
                .onCase({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .onCase({ foo: null }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: null }>()
                    return true
                })
                .orThrow()
        })

        test("exhaustive patterns #5", () => {
            match.shape({ foo: "foo" } as { foo?: "foo" })
                .onCase({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .onCase({ foo: undefined }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: undefined }>()
                    return true
                })
                .orThrow()
        })

        test("exhaustive patterns #6", () => {
            match.shape({ foo: "foo" } as { foo: "foo" } | { bar: "bar" })
                .onCase({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .onCase({ bar: "bar" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly bar: "bar" }>()
                    return true
                })
                .orThrow()
        })

        test("non-exhaustive patterns #1", () => {
            match.shape({ foo: "foo" as "foo" | "bar" })
                .onCase({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: "foo" as "foo" | "bar" })
                .onCase({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "bar" }>()
                })
        })

        test("non-exhaustive patterns #2", () => {
            match.shape({ foo: "foo" as string })
                .onCase({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: "foo" as string })
                .onCase({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: string }>()
                })
        })

        test("non-exhaustive patterns #3", () => {
            match.shape({ foo: "foo" as string })
                .onCase({ foo: "foo" as string }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: string }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: "foo" as string })
                .onCase({ foo: "foo" as string }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: string }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: string }>()
                })
        })

        test("non-exhaustive patterns #4", () => {
            match.shape({ foo: true as boolean })
                .onCase({ foo: true }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: true }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: true as boolean })
                .onCase({ foo: true }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: true }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: false }>()
                })
        })

        test("non-exhaustive patterns #6", () => {
            match.shape({ foo: 0 as 0 | 1 })
                .onCase({ foo: 0 }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 0 }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: 0 as 0 | 1 })
                .onCase({ foo: 0 }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 0 }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 1 }>()
                })
        })

        test("non-exhaustive patterns #7", () => {
            match.shape({ foo: 0 as number })
                .onCase({ foo: 0 }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 0 }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: 0 as number })
                .onCase({ foo: 0 }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 0 }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: number }>()
                })
        })

        test("non-exhaustive patterns #8", () => {
            match.shape({ foo: 0 as number })
                .onCase({ foo: 0 as number }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: number }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: 0 as number })
                .onCase({ foo: 0 as number }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: number }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: number }>()
                })
        })

        test("non-exhaustive patterns #9", () => {
            match.shape({ foo: "foo" as "foo" | null })
                .onCase({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: "foo" as "foo" | null })
                .onCase({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: null }>()
                })
        })

        test("non-exhaustive patterns #10", () => {
            match.shape({ foo: null as "foo" | null })
                .onCase({ foo: null }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: null }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: null as "foo" | null })
                .onCase({ foo: null }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: null }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                })
        })

        test("non-exhaustive patterns #11", () => {
            match.shape({ foo: "foo" } as { foo?: "foo" })
                .onCase({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: "foo" } as { foo?: "foo" })
                .onCase({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: undefined }>()
                })
        })

        test("non-exhaustive patterns #12", () => {
            match.shape({ foo: undefined } as { foo?: "foo" })
                .onCase({ foo: undefined }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: undefined }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: undefined } as { foo?: "foo" })
                .onCase({ foo: undefined }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: undefined }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                })
        })

        test("non-exhaustive patterns #13", () => {
            match.shape({ foo: "foo" } as { foo: "foo" } | { bar: "bar" })
                .onCase({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match.shape({ foo: "foo" } as { foo: "foo" } | { bar: "bar" })
                .onCase({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly bar: "bar" }>()
                })
        })

        test("duplicated patterns #1", () => {
            match.shape({ foo: "foo" as "foo" | "bar" })
                .onCase({ foo: "foo" }, () => true)
            // @ts-expect-error test case.
                .onCase({ foo: "foo" }, () => true)
        })

        test("duplicated patterns #2", () => {
            match.shape({ foo: "foo" as string })
                .onCase({ foo: "foo" }, () => true)
            // @ts-expect-error test case.
                .onCase({ foo: "foo" }, () => true)
        })

        test("duplicated patterns #3", () => {
            match.shape({ foo: 0 as 0 | 1 })
                .onCase({ foo: 0 }, () => true)
            // @ts-expect-error test case.
                .onCase({ foo: 0 }, () => true)
        })

        test("duplicated patterns #4", () => {
            match.shape({ foo: 0 as number })
                .onCase({ foo: 0 }, () => true)
            // @ts-expect-error test case.
                .onCase({ foo: 0 }, () => true)
        })

        test("duplicated patterns #5", () => {
            match.shape({ foo: true })
                .onCase({ foo: true }, () => true)
            // @ts-expect-error test case.
                .onCase({ foo: true }, () => true)
        })

        test("duplicated patterns #6", () => {
            match.shape({ foo: true as boolean })
                .onCase({ foo: true }, () => true)
            // @ts-expect-error test case.
                .onCase({ foo: true }, () => true)
        })

        test("duplicated patterns #7", () => {
            match.shape({ foo: null as string | null })
                .onCase({ foo: null }, () => true)
            // @ts-expect-error test case.
                .onCase({ foo: null }, () => true)
        })

        test("duplicated patterns #8", () => {
            match.shape({ foo: undefined } as { foo?: string })
                .onCase({ foo: undefined }, () => true)
            // @ts-expect-error test case.
                .onCase({ foo: undefined }, () => true)
        })

        test("invalid patterns #1", () => {
            match.shape({ foo: true })
            // @ts-expect-error test case.
                .onCase({ bar: true }, () => true)
        })

        test("invalid patterns #2", () => {
            match.shape({ foo: true })
            // @ts-expect-error test case.
                .onCase({ bar: true, baz: true }, () => true)
        })

        test("invalid patterns #3", () => {
            match.shape({ foo: ["foo"] })
            // @ts-expect-error test case.
                .onCase({ foo: ["foo"] }, () => true)
        })

        test("invalid patterns #4", () => {
            match.shape({ foo: true })
            // @ts-expect-error test case.
                .onCase({ foo: undefined }, () => true)
        })

        test("invalid patterns #5", () => {
            match.shape({ foo: true })
            // @ts-expect-error test case.
                .onCase({}, () => true)
        })

        test("invalid patterns #6", () => {
            // @ts-expect-error test case.
            match.shape({ foo: true } as { foo: boolean } | string)
        })
    })
})
