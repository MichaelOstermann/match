import { describe, test } from "vitest"
import { expectSnapshot } from "./helpers.js"

describe("case", () => {
    test("optimize #1", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .case(1, "one")
                .or("unknown")
        `)
    })
})
