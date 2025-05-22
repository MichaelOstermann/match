import { describe, test } from "vitest"
import { expectSnapshot } from "./helpers.js"

describe("cond", () => {
    test("optimize #1", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond(transform, true)
                .or(false)
        `)
    })

    test("optimize #2", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond(() => value, true)
                .or(false)
        `)
    })

    test("optimize #3", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond((v) => v, true)
                .or(false)
        `)
    })

    test("optimize #4", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond((v) => v ? 1 : 2, true)
                .or(false)
        `)
    })

    test("optimize #5", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond((v) => v.foo, true)
                .or(false)
        `)
    })

    test("optimize #6", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond((v) => transform(v), true)
                .or(false)
        `)
    })

    test("optimize #7", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond((v) => transform(v.foo), true)
                .or(false)
        `)
    })

    test("optimize #8", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond(function() { return value }, true)
                .or(false)
        `)
    })

    test("optimize #9", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond(() => { return value }, true)
                .or(false)
        `)
    })

    test("optimize #10", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond(function(v) { return v }, true)
                .or(false)
        `)
    })

    test("optimize #11", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond((v) => { return v }, true)
                .or(false)
        `)
    })

    test("optimize #12", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond(function(v) { return v ? 1 : 2 }, true)
                .or(false)
        `)
    })

    test("optimize #13", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond((v) => { return v ? 1 : 2 }, true)
                .or(false)
        `)
    })

    test("optimize #14", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond(function(v) { return v.foo }, true)
                .or(false)
        `)
    })

    test("optimize #15", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond((v) => { return v.foo }, true)
                .or(false)
        `)
    })

    test("optimize #16", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond(function(v) { return transform(v) }, true)
                .or(false)
        `)
    })

    test("optimize #17", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond((v) => { return transform(v) }, true)
                .or(false)
        `)
    })

    test("optimize #18", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond(function(v) { return transform(v.foo) }, true)
                .or(false)
        `)
    })

    test("optimize #19", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .cond((v) => { return transform(v.foo) }, true)
                .or(false)
        `)
    })

    test("optimize #20", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond(transform, true)
                .or(false)
        `)
    })

    test("optimize #21", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond(() => value, true)
                .or(false)
        `)
    })

    test("optimize #22", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond((v) => v, true)
                .or(false)
        `)
    })

    test("optimize #23", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond((v) => v ? 1 : 2, true)
                .or(false)
        `)
    })

    test("optimize #24", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond((v) => v.foo, true)
                .or(false)
        `)
    })

    test("optimize #25", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond((v) => transform(v), true)
                .or(false)
        `)
    })

    test("optimize #26", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond((v) => transform(v.foo), true)
                .or(false)
        `)
    })

    test("optimize #27", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond(function() { return value }, true)
                .or(false)
        `)
    })

    test("optimize #28", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond(() => { return value }, true)
                .or(false)
        `)
    })

    test("optimize #29", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond(function(v) { return v }, true)
                .or(false)
        `)
    })

    test("optimize #30", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond((v) => { return v }, true)
                .or(false)
        `)
    })

    test("optimize #31", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond(function(v) { return v ? 1 : 2 }, true)
                .or(false)
        `)
    })

    test("optimize #32", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond((v) => { return v ? 1 : 2 }, true)
                .or(false)
        `)
    })

    test("optimize #33", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond(function(v) { return v.foo }, true)
                .or(false)
        `)
    })

    test("optimize #34", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond((v) => { return v.foo }, true)
                .or(false)
        `)
    })

    test("optimize #35", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond(function(v) { return transform(v) }, true)
                .or(false)
        `)
    })

    test("optimize #36", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond((v) => { return transform(v) }, true)
                .or(false)
        `)
    })

    test("optimize #37", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond(function(v) { return transform(v.foo) }, true)
                .or(false)
        `)
    })

    test("optimize #38", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .cond((v) => { return transform(v.foo) }, true)
                .or(false)
        `)
    })

    test("optimize #39", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond(transform, true)
                .or(false)
        `)
    })

    test("optimize #40", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond(() => value, true)
                .or(false)
        `)
    })

    test("optimize #41", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond((v) => v, true)
                .or(false)
        `)
    })

    test("optimize #42", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond((v) => v ? 1 : 2, true)
                .or(false)
        `)
    })

    test("optimize #43", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond((v) => v.foo, true)
                .or(false)
        `)
    })

    test("optimize #44", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond((v) => transform(v), true)
                .or(false)
        `)
    })

    test("optimize #45", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond((v) => transform(v.foo), true)
                .or(false)
        `)
    })

    test("optimize #46", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond(function() { return value }, true)
                .or(false)
        `)
    })

    test("optimize #47", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond(() => { return value }, true)
                .or(false)
        `)
    })

    test("optimize #48", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond(function(v) { return v }, true)
                .or(false)
        `)
    })

    test("optimize #49", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond((v) => { return v }, true)
                .or(false)
        `)
    })

    test("optimize #50", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond(function(v) { return v ? 1 : 2 }, true)
                .or(false)
        `)
    })

    test("optimize #51", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond((v) => { return v ? 1 : 2 }, true)
                .or(false)
        `)
    })

    test("optimize #52", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond(function(v) { return v.foo }, true)
                .or(false)
        `)
    })

    test("optimize #53", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond((v) => { return v.foo }, true)
                .or(false)
        `)
    })

    test("optimize #54", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond(function(v) { return transform(v) }, true)
                .or(false)
        `)
    })

    test("optimize #55", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond((v) => { return transform(v) }, true)
                .or(false)
        `)
    })

    test("optimize #56", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond(function(v) { return transform(v.foo) }, true)
                .or(false)
        `)
    })

    test("optimize #57", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .cond((v) => { return transform(v.foo) }, true)
                .or(false)
        `)
    })
})
