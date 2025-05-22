import { describe, test } from "vitest"
import { expectSnapshot } from "./helpers.js"

describe("onCond", () => {
    test("optimize #1", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond(transform, transform)
                .or(false)
        `)
    })

    test("optimize #2", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond(transform, () => value)
                .or(false)
        `)
    })

    test("optimize #3", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond(transform, (v) => v)
                .or(false)
        `)
    })

    test("optimize #4", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond(transform, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #5", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond(transform, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #6", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond(transform, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #7", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond(transform, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #8", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond(() => value, transform)
                .or(false)
        `)
    })

    test("optimize #9", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond(() => value, () => value)
                .or(false)
        `)
    })

    test("optimize #10", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond(() => value, (v) => v)
                .or(false)
        `)
    })

    test("optimize #11", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond(() => value, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #12", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond(() => value, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #13", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond(() => value, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #14", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond(() => value, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #15", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v, transform)
                .or(false)
        `)
    })

    test("optimize #16", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v, () => value)
                .or(false)
        `)
    })

    test("optimize #17", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v, (v) => v)
                .or(false)
        `)
    })

    test("optimize #18", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #19", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #20", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #21", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #22", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v ? 1 : 2, transform)
                .or(false)
        `)
    })

    test("optimize #23", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v ? 1 : 2, () => value)
                .or(false)
        `)
    })

    test("optimize #24", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v ? 1 : 2, (v) => v)
                .or(false)
        `)
    })

    test("optimize #25", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v ? 1 : 2, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #26", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v ? 1 : 2, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #27", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v ? 1 : 2, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #28", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v ? 1 : 2, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #29", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v.foo, transform)
                .or(false)
        `)
    })

    test("optimize #30", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v.foo, () => value)
                .or(false)
        `)
    })

    test("optimize #31", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v.foo, (v) => v)
                .or(false)
        `)
    })

    test("optimize #32", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v.foo, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #33", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v.foo, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #34", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v.foo, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #35", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => v.foo, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #36", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => transform(v), transform)
                .or(false)
        `)
    })

    test("optimize #37", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => transform(v), () => value)
                .or(false)
        `)
    })

    test("optimize #38", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => transform(v), (v) => v)
                .or(false)
        `)
    })

    test("optimize #39", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => transform(v), (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #40", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => transform(v), (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #41", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => transform(v), (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #42", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => transform(v), (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #43", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => transform(v.foo), transform)
                .or(false)
        `)
    })

    test("optimize #44", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => transform(v.foo), () => value)
                .or(false)
        `)
    })

    test("optimize #45", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => transform(v.foo), (v) => v)
                .or(false)
        `)
    })

    test("optimize #46", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => transform(v.foo), (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #47", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => transform(v.foo), (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #48", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => transform(v.foo), (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #49", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onCond((v) => transform(v.foo), (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #50", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond(transform, transform)
                .or(false)
        `)
    })

    test("optimize #51", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond(transform, () => value)
                .or(false)
        `)
    })

    test("optimize #52", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond(transform, (v) => v)
                .or(false)
        `)
    })

    test("optimize #53", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond(transform, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #54", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond(transform, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #55", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond(transform, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #56", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond(transform, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #57", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond(() => value, transform)
                .or(false)
        `)
    })

    test("optimize #58", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond(() => value, () => value)
                .or(false)
        `)
    })

    test("optimize #59", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond(() => value, (v) => v)
                .or(false)
        `)
    })

    test("optimize #60", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond(() => value, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #61", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond(() => value, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #62", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond(() => value, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #63", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond(() => value, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #64", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v, transform)
                .or(false)
        `)
    })

    test("optimize #65", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v, () => value)
                .or(false)
        `)
    })

    test("optimize #66", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v, (v) => v)
                .or(false)
        `)
    })

    test("optimize #67", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #68", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #69", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #70", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #71", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v ? 1 : 2, transform)
                .or(false)
        `)
    })

    test("optimize #72", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v ? 1 : 2, () => value)
                .or(false)
        `)
    })

    test("optimize #73", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v ? 1 : 2, (v) => v)
                .or(false)
        `)
    })

    test("optimize #74", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v ? 1 : 2, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #75", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v ? 1 : 2, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #76", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v ? 1 : 2, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #77", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v ? 1 : 2, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #78", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v.foo, transform)
                .or(false)
        `)
    })

    test("optimize #79", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v.foo, () => value)
                .or(false)
        `)
    })

    test("optimize #80", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v.foo, (v) => v)
                .or(false)
        `)
    })

    test("optimize #81", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v.foo, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #82", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v.foo, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #83", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v.foo, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #84", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => v.foo, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #85", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => transform(v), transform)
                .or(false)
        `)
    })

    test("optimize #86", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => transform(v), () => value)
                .or(false)
        `)
    })

    test("optimize #87", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => transform(v), (v) => v)
                .or(false)
        `)
    })

    test("optimize #88", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => transform(v), (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #89", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => transform(v), (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #90", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => transform(v), (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #91", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => transform(v), (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #92", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => transform(v.foo), transform)
                .or(false)
        `)
    })

    test("optimize #93", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => transform(v.foo), () => value)
                .or(false)
        `)
    })

    test("optimize #94", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => transform(v.foo), (v) => v)
                .or(false)
        `)
    })

    test("optimize #95", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => transform(v.foo), (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #96", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => transform(v.foo), (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #97", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => transform(v.foo), (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #98", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onCond((v) => transform(v.foo), (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #99", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond(transform, transform)
                .or(false)
        `)
    })

    test("optimize #100", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond(transform, () => value)
                .or(false)
        `)
    })

    test("optimize #101", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond(transform, (v) => v)
                .or(false)
        `)
    })

    test("optimize #102", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond(transform, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #103", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond(transform, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #104", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond(transform, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #105", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond(transform, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #106", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond(() => value, transform)
                .or(false)
        `)
    })

    test("optimize #107", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond(() => value, () => value)
                .or(false)
        `)
    })

    test("optimize #108", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond(() => value, (v) => v)
                .or(false)
        `)
    })

    test("optimize #109", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond(() => value, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #110", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond(() => value, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #111", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond(() => value, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #112", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond(() => value, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #113", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v, transform)
                .or(false)
        `)
    })

    test("optimize #114", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v, () => value)
                .or(false)
        `)
    })

    test("optimize #115", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v, (v) => v)
                .or(false)
        `)
    })

    test("optimize #116", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #117", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #118", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #119", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #120", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v ? 1 : 2, transform)
                .or(false)
        `)
    })

    test("optimize #121", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v ? 1 : 2, () => value)
                .or(false)
        `)
    })

    test("optimize #122", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v ? 1 : 2, (v) => v)
                .or(false)
        `)
    })

    test("optimize #123", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v ? 1 : 2, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #124", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v ? 1 : 2, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #125", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v ? 1 : 2, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #126", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v ? 1 : 2, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #127", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v.foo, transform)
                .or(false)
        `)
    })

    test("optimize #128", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v.foo, () => value)
                .or(false)
        `)
    })

    test("optimize #129", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v.foo, (v) => v)
                .or(false)
        `)
    })

    test("optimize #130", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v.foo, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #131", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v.foo, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #132", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v.foo, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #133", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => v.foo, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #134", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => transform(v), transform)
                .or(false)
        `)
    })

    test("optimize #135", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => transform(v), () => value)
                .or(false)
        `)
    })

    test("optimize #136", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => transform(v), (v) => v)
                .or(false)
        `)
    })

    test("optimize #137", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => transform(v), (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #138", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => transform(v), (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #139", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => transform(v), (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #140", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => transform(v), (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #141", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => transform(v.foo), transform)
                .or(false)
        `)
    })

    test("optimize #142", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => transform(v.foo), () => value)
                .or(false)
        `)
    })

    test("optimize #143", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => transform(v.foo), (v) => v)
                .or(false)
        `)
    })

    test("optimize #144", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => transform(v.foo), (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #145", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => transform(v.foo), (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #146", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => transform(v.foo), (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #147", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onCond((v) => transform(v.foo), (v) => transform(v.foo))
                .or(false)
        `)
    })
})
