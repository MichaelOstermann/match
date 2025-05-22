import { describe, test } from "vitest"
import { expectSnapshot } from "./helpers.js"

describe("onCase", () => {
    test("optimize #1", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCase(a, transform)
                .or(false)
        `)
    })

    test("optimize #2", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCase(a, () => value)
                .or(false)
        `)
    })

    test("optimize #3", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCase(a, (v) => v)
                .or(false)
        `)
    })

    test("optimize #4", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCase(a, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #5", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCase(a, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #6", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCase(a, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #7", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCase(a, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #8", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCase(a, transform)
                .or(false)
        `)
    })

    test("optimize #9", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCase(a, () => value)
                .or(false)
        `)
    })

    test("optimize #10", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCase(a, (v) => v)
                .or(false)
        `)
    })

    test("optimize #11", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCase(a, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #12", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCase(a, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #13", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCase(a, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #14", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCase(a, (v) => transform(v.foo))
                .or(false)
        `)
    })
})
