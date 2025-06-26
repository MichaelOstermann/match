import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"
import { match as tsMatch } from "ts-pattern"
import { match } from "../packages/match/src/match"

const bench = new Bench()

bench
    .add("@monstermann/match", () => {
        const a = 10 as number
        const b = 10 as number
        const c = 10 as number

        return match({ bar: b, baz: c, foo: a })
            .shape({ bar: 0, baz: 0, foo: 0 }, true)
            .shape({ bar: 1, baz: 1, foo: 1 }, true)
            .shape({ bar: 2, baz: 2, foo: 2 }, true)
            .shape({ bar: 3, baz: 3, foo: 3 }, true)
            .shape({ bar: 4, baz: 4, foo: 4 }, true)
            .shape({ bar: 5, baz: 5, foo: 5 }, true)
            .shape({ bar: 6, baz: 6, foo: 6 }, true)
            .shape({ bar: 7, baz: 7, foo: 7 }, true)
            .shape({ bar: 8, baz: 8, foo: 8 }, true)
            .shape({ bar: 9, baz: 9, foo: 9 }, true)
            .shape({ bar: 10, baz: 10, foo: 10 }, true)
            .or(false)
    })
    .add("ts-pattern", () => {
        const a = 10 as number
        const b = 10 as number
        const c = 10 as number

        return tsMatch({ bar: b, baz: c, foo: a })
            .with({ bar: 0, baz: 0, foo: 0 }, () => true)
            .with({ bar: 1, baz: 1, foo: 1 }, () => true)
            .with({ bar: 2, baz: 2, foo: 2 }, () => true)
            .with({ bar: 3, baz: 3, foo: 3 }, () => true)
            .with({ bar: 4, baz: 4, foo: 4 }, () => true)
            .with({ bar: 5, baz: 5, foo: 5 }, () => true)
            .with({ bar: 6, baz: 6, foo: 6 }, () => true)
            .with({ bar: 7, baz: 7, foo: 7 }, () => true)
            .with({ bar: 8, baz: 8, foo: 8 }, () => true)
            .with({ bar: 9, baz: 9, foo: 9 }, () => true)
            .with({ bar: 10, baz: 10, foo: 10 }, () => true)
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

    .then(console.log)
