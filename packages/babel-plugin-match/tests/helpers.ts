import { transformSync } from "@babel/core"
import { assert, expect } from "vitest"
import matchPlugin from "../src/index"

export function expectSkip(code: string): void {
    const expected = transformSync(code)?.code
    const actual = transformSync(code, { plugins: [matchPlugin] })?.code
    assert(expected === actual, `Expected:\n\n${expected}\n\nActual:\n\n${actual}\n`)
}

export function expectSnapshot(code: string): void {
    const actual = transformSync(code, { plugins: [matchPlugin] })?.code ?? ""
    const untransformed = transformSync(code, { plugins: [] })?.code ?? ""
    expect(actual).not.toBe(untransformed)
    expect(actual).toMatchSnapshot()
}
