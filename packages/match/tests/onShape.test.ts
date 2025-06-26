import { describe, expect, expectTypeOf, test } from "vitest"
import { match } from "../src/match"

describe("onShape", () => {
    describe("implementation", () => {
        test("should return matching shape", () => {
            const result = match({ foo: 2 } as { foo: 1 | 2 | 3 })
                .onShape({ foo: 1 }, () => 1)
                .onShape({ foo: 2 }, () => 2)
                .onShape({ foo: 3 }, () => 3)
                .orThrow()

            expect(result).toBe(2)
        })
    })

    describe("types", () => {
        test("exhaustive patterns #1", () => {
            match({ foo: "foo" as "foo" | "bar" })
                .onShape({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .onShape({ foo: "bar" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "bar" }>()
                    return true
                })
                .orThrow()
        })

        test("exhaustive patterns #2", () => {
            match({ foo: "foo" as "foo" | "bar" })
                .onShape({ foo: "foo" as "foo" | "bar" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" | "bar" }>()
                    return true
                })
                .orThrow()
        })

        test("exhaustive patterns #3", () => {
            match({ foo: 0 as 0 | 1 })
                .onShape({ foo: 0 }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 0 }>()
                    return true
                })
                .onShape({ foo: 1 }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 1 }>()
                    return true
                })
                .orThrow()
        })

        test("exhaustive patterns #4", () => {
            match({ foo: 0 as 0 | 1 })
                .onShape({ foo: 0 as 0 | 1 }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 0 | 1 }>()
                    return true
                })
                .orThrow()
        })

        test("exhaustive patterns #5", () => {
            match({ foo: true as boolean })
                .onShape({ foo: true }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: true }>()
                    return true
                })
                .onShape({ foo: false }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: false }>()
                    return true
                })
                .orThrow()
        })

        test("exhaustive patterns #6", () => {
            match({ foo: "foo" as "foo" | null })
                .onShape({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .onShape({ foo: null }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: null }>()
                    return true
                })
                .orThrow()
        })

        test("exhaustive patterns #7", () => {
            match({ foo: "foo" as "foo" | null })
                .onShape({ foo: "foo" as "foo" | null }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" | null }>()
                    return true
                })
                .orThrow()
        })

        test("exhaustive patterns #8", () => {
            match({ foo: "foo" } as { foo?: "foo" })
                .onShape({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .onShape({ foo: undefined }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: undefined }>()
                    return true
                })
                .orThrow()
        })

        test("exhaustive patterns #9", () => {
            match({ foo: "foo" } as { foo?: "foo" })
                .onShape({ foo: "foo" as "foo" | undefined }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" | undefined }>()
                    return true
                })
                .orThrow()
        })

        test("exhaustive patterns #10", () => {
            match({ foo: "foo" } as { foo: "foo" } | { bar: "bar" })
                .onShape({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .onShape({ bar: "bar" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly bar: "bar" }>()
                    return true
                })
                .orThrow()
        })

        test("non-exhaustive patterns #1", () => {
            match({ foo: "foo" as "foo" | "bar" })
                .onShape({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: "foo" as "foo" | "bar" })
                .onShape({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "bar" }>()
                })
        })

        test("non-exhaustive patterns #2", () => {
            match({ foo: "foo" as string })
                .onShape({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: "foo" as string })
                .onShape({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: string }>()
                })
        })

        test("non-exhaustive patterns #3", () => {
            match({ foo: "foo" as string })
                .onShape({ foo: "foo" as string }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: string }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: "foo" as string })
                .onShape({ foo: "foo" as string }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: string }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: string }>()
                })
        })

        test("non-exhaustive patterns #4", () => {
            match({ foo: true as boolean })
                .onShape({ foo: true }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: true }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: true as boolean })
                .onShape({ foo: true }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: true }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: false }>()
                })
        })

        test("non-exhaustive patterns #5", () => {
            match({ foo: true as boolean })
                .onShape({ foo: true as boolean }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: boolean }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: true as boolean })
                .onShape({ foo: true as boolean }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: boolean }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: boolean }>()
                })
        })

        test("non-exhaustive patterns #6", () => {
            match({ foo: 0 as 0 | 1 })
                .onShape({ foo: 0 }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 0 }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: 0 as 0 | 1 })
                .onShape({ foo: 0 }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 0 }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 1 }>()
                })
        })

        test("non-exhaustive patterns #7", () => {
            match({ foo: 0 as number })
                .onShape({ foo: 0 }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 0 }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: 0 as number })
                .onShape({ foo: 0 }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: 0 }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: number }>()
                })
        })

        test("non-exhaustive patterns #8", () => {
            match({ foo: 0 as number })
                .onShape({ foo: 0 as number }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: number }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: 0 as number })
                .onShape({ foo: 0 as number }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: number }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: number }>()
                })
        })

        test("non-exhaustive patterns #9", () => {
            match({ foo: "foo" as "foo" | null })
                .onShape({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: "foo" as "foo" | null })
                .onShape({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: null }>()
                })
        })

        test("non-exhaustive patterns #10", () => {
            match({ foo: null as "foo" | null })
                .onShape({ foo: null }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: null }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: null as "foo" | null })
                .onShape({ foo: null }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: null }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                })
        })

        test("non-exhaustive patterns #11", () => {
            match({ foo: "foo" } as { foo?: "foo" })
                .onShape({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: "foo" } as { foo?: "foo" })
                .onShape({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: undefined }>()
                })
        })

        test("non-exhaustive patterns #12", () => {
            match({ foo: undefined } as { foo?: "foo" })
                .onShape({ foo: undefined }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: undefined }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: undefined } as { foo?: "foo" })
                .onShape({ foo: undefined }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: undefined }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                })
        })

        test("non-exhaustive patterns #13", () => {
            match({ foo: "foo" } as { foo: "foo" } | { bar: "bar" })
                .onShape({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
            // @ts-expect-error test case.
                .orThrow()

            match({ foo: "foo" } as { foo: "foo" } | { bar: "bar" })
                .onShape({ foo: "foo" }, (value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly foo: "foo" }>()
                    return true
                })
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<{ readonly bar: "bar" }>()
                })
        })

        test("duplicated patterns #1", () => {
            match({ foo: "foo" as "foo" | "bar" })
                .onShape({ foo: "foo" }, () => true)
            // @ts-expect-error test case.
                .onShape({ foo: "foo" }, () => true)
        })

        test("duplicated patterns #2", () => {
            match({ foo: "foo" as string })
                .onShape({ foo: "foo" }, () => true)
            // @ts-expect-error test case.
                .onShape({ foo: "foo" }, () => true)
        })

        test("duplicated patterns #3", () => {
            match({ foo: 0 as 0 | 1 })
                .onShape({ foo: 0 }, () => true)
            // @ts-expect-error test case.
                .onShape({ foo: 0 }, () => true)
        })

        test("duplicated patterns #4", () => {
            match({ foo: 0 as number })
                .onShape({ foo: 0 }, () => true)
            // @ts-expect-error test case.
                .onShape({ foo: 0 }, () => true)
        })

        test("duplicated patterns #5", () => {
            match({ foo: true })
                .onShape({ foo: true }, () => true)
            // @ts-expect-error test case.
                .onShape({ foo: true }, () => true)
        })

        test("duplicated patterns #6", () => {
            match({ foo: true as boolean })
                .onShape({ foo: true }, () => true)
            // @ts-expect-error test case.
                .onShape({ foo: true }, () => true)
        })

        test("duplicated patterns #7", () => {
            match({ foo: null as string | null })
                .onShape({ foo: null }, () => true)
            // @ts-expect-error test case.
                .onShape({ foo: null }, () => true)
        })

        test("duplicated patterns #8", () => {
            match({ foo: undefined } as { foo?: string })
                .onShape({ foo: undefined }, () => true)
            // @ts-expect-error test case.
                .onShape({ foo: undefined }, () => true)
        })

        test("invalid patterns #1", () => {
            match({ foo: true })
            // @ts-expect-error test case.
                .onShape({ bar: true }, () => true)
        })

        test("invalid patterns #2", () => {
            match({ foo: true })
            // @ts-expect-error test case.
                .onShape({ bar: true, baz: true }, () => true)
        })

        test("invalid patterns #3", () => {
            match({ foo: ["foo"] })
            // @ts-expect-error test case.
                .onShape({ foo: ["foo"] }, () => true)
        })

        test("invalid patterns #4", () => {
            match({ foo: true })
            // @ts-expect-error test case.
                .onShape({ foo: undefined }, () => true)
        })

        test("invalid patterns #5", () => {
            match({ foo: true })
            // @ts-expect-error test case.
                .onShape({}, () => true)
        })

        test("invalid patterns #6", () => {
            match({ foo: true } as { foo: boolean } | string)
            // @ts-expect-error test case.
                .onShape("foo", () => true)
        })
    })
})
