import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"
import { match } from "../packages/match/src/match.js"
import { match as tsMatch } from "ts-pattern"

const bench = new Bench()

bench
    .add("@monstermann/match", () => {
        const a = 10 as number
        const b = 10 as number
        const c = 10 as number

        return match({ foo: a, bar: b, baz: c })
            .shape({ foo: 0, bar: 0, baz: 0 }, true)
            .shape({ foo: 1, bar: 1, baz: 1 }, true)
            .shape({ foo: 2, bar: 2, baz: 2 }, true)
            .shape({ foo: 3, bar: 3, baz: 3 }, true)
            .shape({ foo: 4, bar: 4, baz: 4 }, true)
            .shape({ foo: 5, bar: 5, baz: 5 }, true)
            .shape({ foo: 6, bar: 6, baz: 6 }, true)
            .shape({ foo: 7, bar: 7, baz: 7 }, true)
            .shape({ foo: 8, bar: 8, baz: 8 }, true)
            .shape({ foo: 9, bar: 9, baz: 9 }, true)
            .shape({ foo: 10, bar: 10, baz: 10 }, true)
            .or(false)
    })
    .add("ts-pattern", () => {
        const a = 10 as number
        const b = 10 as number
        const c = 10 as number

        return tsMatch({ foo: a, bar: b, baz: c })
            .with({ foo: 0, bar: 0, baz: 0 }, () => true)
            .with({ foo: 1, bar: 1, baz: 1 }, () => true)
            .with({ foo: 2, bar: 2, baz: 2 }, () => true)
            .with({ foo: 3, bar: 3, baz: 3 }, () => true)
            .with({ foo: 4, bar: 4, baz: 4 }, () => true)
            .with({ foo: 5, bar: 5, baz: 5 }, () => true)
            .with({ foo: 6, bar: 6, baz: 6 }, () => true)
            .with({ foo: 7, bar: 7, baz: 7 }, () => true)
            .with({ foo: 8, bar: 8, baz: 8 }, () => true)
            .with({ foo: 9, bar: 9, baz: 9 }, () => true)
            .with({ foo: 10, bar: 10, baz: 10 }, () => true)
            .otherwise(() => false)
    })
    .add("@monstermann/babel-plugin-match", () => {
        const a = 10 as number
        const b = 10 as number
        const c = 10 as number

        // eslint-disable-next-line no-unneeded-ternary
        return a === 0 && b === 0 && c === 0 ? true : a === 1 && b === 1 && c === 1 ? true : a === 2 && b === 2 && c === 2 ? true : a === 3 && b === 3 && c === 3 ? true : a === 4 && b === 4 && c === 4 ? true : a === 5 && b === 5 && c === 5 ? true : a === 6 && b === 6 && c === 6 ? true : a === 7 && b === 7 && c === 7 ? true : a === 8 && b === 8 && c === 8 ? true : a === 9 && b === 9 && c === 9 ? true : a === 10 && b === 10 && c === 10 ? true : false
    })

bench
    .run()
    .then(() => tinybenchPrinter.toMarkdown(bench))
    // eslint-disable-next-line no-console
    .then(console.log)
