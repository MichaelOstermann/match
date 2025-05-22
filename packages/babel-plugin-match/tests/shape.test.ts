import { describe, test } from "vitest"
import { expectSkip, expectSnapshot } from "./helpers.js"

describe("shape", () => {
    test("optimize #1", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .shape({ foo: a }, true)
                .or(false)
        `)
    })

    test("optimize #2", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .shape({ foo: a, bar: b }, true)
                .or(false)
        `)
    })

    test("optimize #3", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .shape({ baz: a }, true)
                .or(false)
        `)
    })

    test("optimize #4", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .shape({ foo: a }, true)
                .or(false)
        `)
    })

    test("optimize #5", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .shape({ foo: a, bar: b }, true)
                .or(false)
        `)
    })

    test("optimize #6", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .shape({ baz: a }, true)
                .or(false)
        `)
    })

    test("optimize #7", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .shape({ foo: a }, true)
                .or(false)
        `)
    })

    test("optimize #8", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .shape({ foo: a, bar: b }, true)
                .or(false)
        `)
    })

    test("optimize #9", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .shape({ baz: a }, true)
                .or(false)
        `)
    })

    test("skip #1", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .shape(b, true)
                .or(false)
        `)
    })

    test("skip #2", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .shape(b(c), true)
                .or(false)
        `)
    })

    test("skip #3", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .shape({ ...foo }, true)
                .or(false)
        `)
    })

    test("skip #4", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .shape({ [foo]: c }, true)
                .or(false)
        `)
    })

    test("skip #5", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .shape(b, true)
                .or(false)
        `)
    })

    test("skip #6", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .shape(b(c), true)
                .or(false)
        `)
    })

    test("skip #7", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .shape({ ...foo }, true)
                .or(false)
        `)
    })

    test("skip #8", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .shape({ [foo]: c }, true)
                .or(false)
        `)
    })

    test("skip #9", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .shape(b, true)
                .or(false)
        `)
    })

    test("skip #10", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .shape(b(c), true)
                .or(false)
        `)
    })

    test("skip #11", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .shape({ ...foo }, true)
                .or(false)
        `)
    })

    test("skip #12", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .shape({ [foo]: c }, true)
                .or(false)
        `)
    })
})
