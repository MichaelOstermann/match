import { describe, test } from "vitest"
import { expectSnapshot } from "./helpers"

describe("orThrow", () => {
    test("optimize #1", () => {
        expectSnapshot(`
            import { match } from "@monstermann/match"
            match(value)
                .case(a, true)
                .orThrow()
        `)
    })
})
