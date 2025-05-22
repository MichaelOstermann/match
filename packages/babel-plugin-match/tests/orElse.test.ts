import { describe, test } from "vitest"
import { expectSnapshot } from "./helpers.js"

describe("orElse", () => {
    test("optimize #1", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .case(any, any)
                .orElse(transform)
        `)
    })

    test("optimize #2", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .case(any, any)
                .orElse(() => value)
        `)
    })

    test("optimize #3", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .case(any, any)
                .orElse((v) => v)
        `)
    })

    test("optimize #4", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .case(any, any)
                .orElse((v) => v ? 1 : 2)
        `)
    })

    test("optimize #5", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .case(any, any)
                .orElse((v) => v.foo)
        `)
    })

    test("optimize #6", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .case(any, any)
                .orElse((v) => transform(v))
        `)
    })

    test("optimize #7", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .case(any, any)
                .orElse((v) => transform(v.foo))
        `)
    })

    test("optimize #8", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .case(any, any)
                .orElse(transform)
        `)
    })

    test("optimize #9", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .case(any, any)
                .orElse(() => value)
        `)
    })

    test("optimize #10", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .case(any, any)
                .orElse((v) => v)
        `)
    })

    test("optimize #11", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .case(any, any)
                .orElse((v) => v ? 1 : 2)
        `)
    })

    test("optimize #12", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .case(any, any)
                .orElse((v) => v.foo)
        `)
    })

    test("optimize #13", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .case(any, any)
                .orElse((v) => transform(v))
        `)
    })

    test("optimize #14", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .case(any, any)
                .orElse((v) => transform(v.foo))
        `)
    })

    test("optimize #15", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .case(any, any)
                .orElse(transform)
        `)
    })

    test("optimize #16", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .case(any, any)
                .orElse(() => value)
        `)
    })

    test("optimize #17", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .case(any, any)
                .orElse((v) => v)
        `)
    })

    test("optimize #18", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .case(any, any)
                .orElse((v) => v ? 1 : 2)
        `)
    })

    test("optimize #19", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .case(any, any)
                .orElse((v) => v.foo)
        `)
    })

    test("optimize #20", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .case(any, any)
                .orElse((v) => transform(v))
        `)
    })

    test("optimize #21", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .case(any, any)
                .orElse((v) => transform(v.foo))
        `)
    })
})
