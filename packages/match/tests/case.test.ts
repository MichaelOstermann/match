import { describe, expect, expectTypeOf, test } from "vitest"
import { match } from "../src/match.js"

describe("case", () => {
    describe("implementation", () => {
        test("should return matching primitive", () => {
            const result = match(2 as 1 | 2 | 3)
                .case(1, "one")
                .case(2, "two")
                .case(3, "three")
                .orThrow()

            expect(result).toBe("two")
        })
    })

    describe("types", () => {
        test("inferred return type", () => {
            const result = match(0 as 0 | 1 | 2)
                .case(0, 0)
                .case(1, "1")
                .case(2, true)
                .orThrow()

            expectTypeOf(result).toEqualTypeOf<number | string | boolean>()
        })

        test("strict return type", () => {
            match(0 as 0 | 1)
                .returnType<number>()
                .case(0, 0)
                // @ts-expect-error test case.
                .case(1, "1")
        })

        test("exhaustive patterns #1", () => {
            match("foo" as "foo" | "bar")
                .case("foo", "foo")
                .case("bar", "bar")
                .orThrow()
        })

        test("exhaustive patterns #2", () => {
            match("foo" as "foo" | "bar")
                .case("foo" as "foo" | "bar", "foo")
                .orThrow()
        })

        test("exhaustive patterns #3", () => {
            match(0 as 0 | 1)
                .case(0, 0)
                .case(1, 1)
                .orThrow()
        })

        test("exhaustive patterns #4", () => {
            match(0 as 0 | 1)
                .case(0 as 0 | 1, 0)
                .orThrow()
        })

        test("exhaustive patterns #5", () => {
            match(true as boolean)
                .case(true, true)
                .case(false, false)
                .orThrow()
        })

        test("exhaustive patterns #6", () => {
            match("foo" as "foo" | null)
                .case("foo", "foo")
                .case(null, null)
                .orThrow()
        })

        test("exhaustive patterns #7", () => {
            match("foo" as "foo" | null)
                .case("foo" as "foo" | null, "foo")
                .orThrow()
        })

        test("exhaustive patterns #8", () => {
            match("foo" as "foo" | undefined)
                .case("foo", "foo")
                .case(undefined, undefined)
                .orThrow()
        })

        test("exhaustive patterns #9", () => {
            match("foo" as "foo" | undefined)
                .case("foo" as "foo" | undefined, "foo")
                .orThrow()
        })

        test("non-exhaustive patterns #1", () => {
            match("foo" as "foo" | "bar")
                .case("foo", "foo")
                // @ts-expect-error test case.
                .orThrow()

            match("foo" as "foo" | "bar")
                .case("foo", "foo")
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<"bar">()
                })
        })

        test("non-exhaustive patterns #2", () => {
            match("foo" as string)
                .case("foo", "foo")
                // @ts-expect-error test case.
                .orThrow()

            match("foo" as string)
                .case("foo", "foo")
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<string>()
                })
        })

        test("non-exhaustive patterns #3", () => {
            match("foo" as string)
                .case("foo" as string, "foo")
                // @ts-expect-error test case.
                .orThrow()

            match("foo" as string)
                .case("foo" as string, "foo")
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<string>()
                })
        })

        test("non-exhaustive patterns #4", () => {
            match(true as boolean)
                .case(true, true)
                // @ts-expect-error test case.
                .orThrow()

            match(true as boolean)
                .case(true, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<false>()
                })
        })

        test("non-exhaustive patterns #5", () => {
            match(true as boolean)
                .case(true as boolean, true)
                // @ts-expect-error test case.
                .orThrow()

            match(true as boolean)
                .case(true as boolean, true)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<boolean>()
                })
        })

        test("non-exhaustive patterns #6", () => {
            match(0 as 0 | 1)
                .case(0, 0)
                // @ts-expect-error test case.
                .orThrow()

            match(0 as 0 | 1)
                .case(0, 0)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<1>()
                })
        })

        test("non-exhaustive patterns #7", () => {
            match(0 as number)
                .case(0, 0)
                // @ts-expect-error test case.
                .orThrow()

            match(0 as number)
                .case(0, 0)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<number>()
                })
        })

        test("non-exhaustive patterns #8", () => {
            match(0 as number)
                .case(0 as number, 0)
                // @ts-expect-error test case.
                .orThrow()

            match(0 as number)
                .case(0 as number, 0)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<number>()
                })
        })

        test("non-exhaustive patterns #9", () => {
            match("foo" as "foo" | null)
                .case("foo", "foo")
                // @ts-expect-error test case.
                .orThrow()

            match("foo" as "foo" | null)
                .case("foo", "foo")
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<null>()
                })
        })

        test("non-exhaustive patterns #10", () => {
            match("foo" as "foo" | undefined)
                .case("foo", "foo")
                // @ts-expect-error test case.
                .orThrow()

            match("foo" as "foo" | undefined)
                .case("foo", "foo")
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<undefined>()
                })
        })

        test("non-exhaustive patterns #11", () => {
            match(null as "foo" | null)
                .case(null, null)
                // @ts-expect-error test case.
                .orThrow()

            match(null as "foo" | null)
                .case(null, null)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<"foo">()
                })
        })

        test("non-exhaustive patterns #12", () => {
            match(undefined as "foo" | undefined)
                .case(undefined, undefined)
                // @ts-expect-error test case.
                .orThrow()

            match(undefined as "foo" | undefined)
                .case(undefined, undefined)
                .orElse((value) => {
                    expectTypeOf(value).toEqualTypeOf<"foo">()
                })
        })

        test("duplicated patterns #1", () => {
            match("foo" as "foo" | "bar")
                .case("foo", "foo")
                // @ts-expect-error test case.
                .case("foo", "foo")
        })

        test("duplicated patterns #2", () => {
            match("foo" as string)
                .case("foo", "foo")
                // @ts-expect-error test case.
                .case("foo", "foo")
        })

        test("duplicated patterns #3", () => {
            match(0 as 0 | 1)
                .case(0, 0)
                // @ts-expect-error test case.
                .case(0, 0)
        })

        test("duplicated patterns #4", () => {
            match(0 as number)
                .case(0, 0)
                // @ts-expect-error test case.
                .case(0, 0)
        })

        test("duplicated patterns #5", () => {
            match(true)
                .case(true, true)
                // @ts-expect-error test case.
                .case(true, true)
        })

        test("duplicated patterns #6", () => {
            match(true as boolean)
                .case(true, true)
                // @ts-expect-error test case.
                .case(true, true)
        })

        test("duplicated patterns #7", () => {
            match(null as string | null)
                .case(null, null)
                // @ts-expect-error test case.
                .case(null, null)
        })

        test("duplicated patterns #8", () => {
            match(undefined as string | undefined)
                .case(undefined, undefined)
                // @ts-expect-error test case.
                .case(undefined, undefined)
        })

        test("invalid patterns #1", () => {
            match("foo")
                // @ts-expect-error test case.
                .case("foo" as string, true)
        })

        test("invalid patterns #2", () => {
            match(0)
                // @ts-expect-error test case.
                .case(0 as number, true)
        })

        test("invalid patterns #3", () => {
            match(true)
                // @ts-expect-error test case.
                .case(0 as boolean, true)
        })

        test("invalid patterns #4", () => {
            match({ foo: true } as { foo: boolean } | string)
                // @ts-expect-error test case.
                .case({ foo: true }, true)
        })

        test("autocompletion #1", () => {
            const result = match("foo" as "foo" | "bar").case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<"foo" | "bar">()
        })

        test("autocompletion #2", () => {
            const result = match("foo" as "foo" | "bar").case("foo", true).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<"bar">()
        })

        test("autocompletion #3", () => {
            const result = match("foo" as string).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<string>()
        })

        test("autocompletion #4", () => {
            const result = match("foo" as string).case("foo", true).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<string>()
        })

        test("autocompletion #5", () => {
            const result = match(true as boolean).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<boolean>()
        })

        test("autocompletion #6", () => {
            const result = match(true as boolean).case(true, true).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<false>()
        })

        test("autocompletion #7", () => {
            const result = match(true as boolean).case(false, true).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<true>()
        })

        test("autocompletion #8", () => {
            const result = match(0 as 0 | 1).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<0 | 1>()
        })

        test("autocompletion #9", () => {
            const result = match(0 as 0 | 1).case(0, true).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<1>()
        })

        test("autocompletion #10", () => {
            const result = match(0 as number).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<number>()
        })

        test("autocompletion #11", () => {
            const result = match(0 as number).case(0, true).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<number>()
        })

        test("autocompletion #12", () => {
            const result = match("foo" as "foo" | null).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<"foo" | null>()
        })

        test("autocompletion #13", () => {
            const result = match("foo" as "foo" | null).case("foo", true).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<null>()
        })

        test("autocompletion #14", () => {
            const result = match("foo" as "foo" | null).case(null, true).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<"foo">()
        })

        test("autocompletion #15", () => {
            const result = match("foo" as "foo" | undefined).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<"foo" | undefined>()
        })

        test("autocompletion #16", () => {
            const result = match("foo" as "foo" | undefined).case("foo", true).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<undefined>()
        })

        test("autocompletion #17", () => {
            const result = match("foo" as "foo" | undefined).case(undefined, true).case
            expectTypeOf<Parameters<typeof result>[0]>().toEqualTypeOf<"foo">()
        })
    })
})
