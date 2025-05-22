import { describe, test } from "vitest"
import { expectSkip } from "./helpers.js"

describe("skips", () => {
    test("skip #1", () => {
        expectSkip(`
            match(value)
                .case(1, "one")
                .or("unknown")
        `)
    })

    test("skip #2", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .case(1, "one")
        `)
    })

    test("skip #3", () => {
        expectSkip(`
            import { match } from "@monstermann/match"
            match(value)
                .foo(1, "one")
                .or("unknown")
        `)
    })
})
