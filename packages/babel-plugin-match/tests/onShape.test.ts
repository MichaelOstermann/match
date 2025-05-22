import { describe, test } from "vitest"
import { expectSkip, expectSnapshot } from "./helpers.js"

describe("onShape", () => {
    test("optimize #1", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ foo: a }, transform)
                .or(false)
        `)
    })

    test("optimize #2", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ foo: a }, () => value)
                .or(false)
        `)
    })

    test("optimize #3", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ foo: a }, (v) => v)
                .or(false)
        `)
    })

    test("optimize #4", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ foo: a }, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #5", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ foo: a }, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #6", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ foo: a }, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #7", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ foo: a }, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #8", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ foo: a, bar: b }, transform)
                .or(false)
        `)
    })

    test("optimize #9", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ foo: a, bar: b }, () => value)
                .or(false)
        `)
    })

    test("optimize #10", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ foo: a, bar: b }, (v) => v)
                .or(false)
        `)
    })

    test("optimize #11", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ foo: a, bar: b }, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #12", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ foo: a, bar: b }, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #13", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ foo: a, bar: b }, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #14", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ foo: a, bar: b }, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #15", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ baz: a }, transform)
                .or(false)
        `)
    })

    test("optimize #16", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ baz: a }, () => value)
                .or(false)
        `)
    })

    test("optimize #17", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ baz: a }, (v) => v)
                .or(false)
        `)
    })

    test("optimize #18", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ baz: a }, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #19", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ baz: a }, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #20", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ baz: a }, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #21", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ baz: a }, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #22", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ foo: a }, transform)
                .or(false)
        `)
    })

    test("optimize #23", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ foo: a }, () => value)
                .or(false)
        `)
    })

    test("optimize #24", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ foo: a }, (v) => v)
                .or(false)
        `)
    })

    test("optimize #25", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ foo: a }, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #26", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ foo: a }, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #27", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ foo: a }, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #28", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ foo: a }, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #29", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ foo: a, bar: b }, transform)
                .or(false)
        `)
    })

    test("optimize #30", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ foo: a, bar: b }, () => value)
                .or(false)
        `)
    })

    test("optimize #31", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ foo: a, bar: b }, (v) => v)
                .or(false)
        `)
    })

    test("optimize #32", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ foo: a, bar: b }, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #33", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ foo: a, bar: b }, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #34", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ foo: a, bar: b }, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #35", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ foo: a, bar: b }, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #36", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ baz: a }, transform)
                .or(false)
        `)
    })

    test("optimize #37", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ baz: a }, () => value)
                .or(false)
        `)
    })

    test("optimize #38", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ baz: a }, (v) => v)
                .or(false)
        `)
    })

    test("optimize #39", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ baz: a }, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #40", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ baz: a }, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #41", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ baz: a }, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #42", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ baz: a }, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #43", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ foo: a }, transform)
                .or(false)
        `)
    })

    test("optimize #44", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ foo: a }, () => value)
                .or(false)
        `)
    })

    test("optimize #45", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ foo: a }, (v) => v)
                .or(false)
        `)
    })

    test("optimize #46", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ foo: a }, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #47", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ foo: a }, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #48", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ foo: a }, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #49", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ foo: a }, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #50", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ foo: a, bar: b }, transform)
                .or(false)
        `)
    })

    test("optimize #51", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ foo: a, bar: b }, () => value)
                .or(false)
        `)
    })

    test("optimize #52", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ foo: a, bar: b }, (v) => v)
                .or(false)
        `)
    })

    test("optimize #53", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ foo: a, bar: b }, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #54", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ foo: a, bar: b }, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #55", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ foo: a, bar: b }, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #56", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ foo: a, bar: b }, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("optimize #57", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ baz: a }, transform)
                .or(false)
        `)
    })

    test("optimize #58", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ baz: a }, () => value)
                .or(false)
        `)
    })

    test("optimize #59", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ baz: a }, (v) => v)
                .or(false)
        `)
    })

    test("optimize #60", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ baz: a }, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("optimize #61", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ baz: a }, (v) => v.foo)
                .or(false)
        `)
    })

    test("optimize #62", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ baz: a }, (v) => transform(v))
                .or(false)
        `)
    })

    test("optimize #63", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ baz: a }, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("skip #1", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape(b, transform)
                .or(false)
        `)
    })

    test("skip #2", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape(b, () => value)
                .or(false)
        `)
    })

    test("skip #3", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape(b, (v) => v)
                .or(false)
        `)
    })

    test("skip #4", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape(b, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("skip #5", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape(b, (v) => v.foo)
                .or(false)
        `)
    })

    test("skip #6", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape(b, (v) => transform(v))
                .or(false)
        `)
    })

    test("skip #7", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape(b, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("skip #8", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape(b(c), transform)
                .or(false)
        `)
    })

    test("skip #9", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape(b(c), () => value)
                .or(false)
        `)
    })

    test("skip #10", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape(b(c), (v) => v)
                .or(false)
        `)
    })

    test("skip #11", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape(b(c), (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("skip #12", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape(b(c), (v) => v.foo)
                .or(false)
        `)
    })

    test("skip #13", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape(b(c), (v) => transform(v))
                .or(false)
        `)
    })

    test("skip #14", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape(b(c), (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("skip #15", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ ...foo }, transform)
                .or(false)
        `)
    })

    test("skip #16", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ ...foo }, () => value)
                .or(false)
        `)
    })

    test("skip #17", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ ...foo }, (v) => v)
                .or(false)
        `)
    })

    test("skip #18", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ ...foo }, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("skip #19", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ ...foo }, (v) => v.foo)
                .or(false)
        `)
    })

    test("skip #20", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ ...foo }, (v) => transform(v))
                .or(false)
        `)
    })

    test("skip #21", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ ...foo }, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("skip #22", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ [foo]: c }, transform)
                .or(false)
        `)
    })

    test("skip #23", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ [foo]: c }, () => value)
                .or(false)
        `)
    })

    test("skip #24", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ [foo]: c }, (v) => v)
                .or(false)
        `)
    })

    test("skip #25", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ [foo]: c }, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("skip #26", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ [foo]: c }, (v) => v.foo)
                .or(false)
        `)
    })

    test("skip #27", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ [foo]: c }, (v) => transform(v))
                .or(false)
        `)
    })

    test("skip #28", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .onShape({ [foo]: c }, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("skip #29", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape(b, transform)
                .or(false)
        `)
    })

    test("skip #30", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape(b, () => value)
                .or(false)
        `)
    })

    test("skip #31", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape(b, (v) => v)
                .or(false)
        `)
    })

    test("skip #32", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape(b, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("skip #33", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape(b, (v) => v.foo)
                .or(false)
        `)
    })

    test("skip #34", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape(b, (v) => transform(v))
                .or(false)
        `)
    })

    test("skip #35", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape(b, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("skip #36", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape(b(c), transform)
                .or(false)
        `)
    })

    test("skip #37", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape(b(c), () => value)
                .or(false)
        `)
    })

    test("skip #38", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape(b(c), (v) => v)
                .or(false)
        `)
    })

    test("skip #39", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape(b(c), (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("skip #40", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape(b(c), (v) => v.foo)
                .or(false)
        `)
    })

    test("skip #41", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape(b(c), (v) => transform(v))
                .or(false)
        `)
    })

    test("skip #42", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape(b(c), (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("skip #43", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ ...foo }, transform)
                .or(false)
        `)
    })

    test("skip #44", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ ...foo }, () => value)
                .or(false)
        `)
    })

    test("skip #45", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ ...foo }, (v) => v)
                .or(false)
        `)
    })

    test("skip #46", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ ...foo }, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("skip #47", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ ...foo }, (v) => v.foo)
                .or(false)
        `)
    })

    test("skip #48", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ ...foo }, (v) => transform(v))
                .or(false)
        `)
    })

    test("skip #49", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ ...foo }, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("skip #50", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ [foo]: c }, transform)
                .or(false)
        `)
    })

    test("skip #51", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ [foo]: c }, () => value)
                .or(false)
        `)
    })

    test("skip #52", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ [foo]: c }, (v) => v)
                .or(false)
        `)
    })

    test("skip #53", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ [foo]: c }, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("skip #54", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ [foo]: c }, (v) => v.foo)
                .or(false)
        `)
    })

    test("skip #55", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ [foo]: c }, (v) => transform(v))
                .or(false)
        `)
    })

    test("skip #56", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match({ foo: a, bar: b })
                .onShape({ [foo]: c }, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("skip #57", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape(b, transform)
                .or(false)
        `)
    })

    test("skip #58", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape(b, () => value)
                .or(false)
        `)
    })

    test("skip #59", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape(b, (v) => v)
                .or(false)
        `)
    })

    test("skip #60", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape(b, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("skip #61", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape(b, (v) => v.foo)
                .or(false)
        `)
    })

    test("skip #62", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape(b, (v) => transform(v))
                .or(false)
        `)
    })

    test("skip #63", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape(b, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("skip #64", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape(b(c), transform)
                .or(false)
        `)
    })

    test("skip #65", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape(b(c), () => value)
                .or(false)
        `)
    })

    test("skip #66", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape(b(c), (v) => v)
                .or(false)
        `)
    })

    test("skip #67", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape(b(c), (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("skip #68", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape(b(c), (v) => v.foo)
                .or(false)
        `)
    })

    test("skip #69", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape(b(c), (v) => transform(v))
                .or(false)
        `)
    })

    test("skip #70", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape(b(c), (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("skip #71", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ ...foo }, transform)
                .or(false)
        `)
    })

    test("skip #72", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ ...foo }, () => value)
                .or(false)
        `)
    })

    test("skip #73", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ ...foo }, (v) => v)
                .or(false)
        `)
    })

    test("skip #74", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ ...foo }, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("skip #75", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ ...foo }, (v) => v.foo)
                .or(false)
        `)
    })

    test("skip #76", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ ...foo }, (v) => transform(v))
                .or(false)
        `)
    })

    test("skip #77", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ ...foo }, (v) => transform(v.foo))
                .or(false)
        `)
    })

    test("skip #78", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ [foo]: c }, transform)
                .or(false)
        `)
    })

    test("skip #79", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ [foo]: c }, () => value)
                .or(false)
        `)
    })

    test("skip #80", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ [foo]: c }, (v) => v)
                .or(false)
        `)
    })

    test("skip #81", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ [foo]: c }, (v) => v ? 1 : 2)
                .or(false)
        `)
    })

    test("skip #82", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ [foo]: c }, (v) => v.foo)
                .or(false)
        `)
    })

    test("skip #83", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ [foo]: c }, (v) => transform(v))
                .or(false)
        `)
    })

    test("skip #84", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(getValue())
                .onShape({ [foo]: c }, (v) => transform(v.foo))
                .or(false)
        `)
    })
})
