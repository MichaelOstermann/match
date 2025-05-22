import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"
import { match } from "../packages/match/src/match.js"
import { match as tsMatch } from "ts-pattern"

const bench = new Bench()

const a = 10 as number
const b = 10 as number
const c = 10 as number

const rec = { foo: a, bar: b, baz: c }

bench
    .add("@monstermann/match", () => {
        return match(rec)
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
        return tsMatch(rec)
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
        // eslint-disable-next-line no-unneeded-ternary
        return rec && typeof rec === "object" && rec.foo === 0 && rec.bar === 0 && rec.baz === 0 ? true : rec && typeof rec === "object" && rec.foo === 1 && rec.bar === 1 && rec.baz === 1 ? true : rec && typeof rec === "object" && rec.foo === 2 && rec.bar === 2 && rec.baz === 2 ? true : rec && typeof rec === "object" && rec.foo === 3 && rec.bar === 3 && rec.baz === 3 ? true : rec && typeof rec === "object" && rec.foo === 4 && rec.bar === 4 && rec.baz === 4 ? true : rec && typeof rec === "object" && rec.foo === 5 && rec.bar === 5 && rec.baz === 5 ? true : rec && typeof rec === "object" && rec.foo === 6 && rec.bar === 6 && rec.baz === 6 ? true : rec && typeof rec === "object" && rec.foo === 7 && rec.bar === 7 && rec.baz === 7 ? true : rec && typeof rec === "object" && rec.foo === 8 && rec.bar === 8 && rec.baz === 8 ? true : rec && typeof rec === "object" && rec.foo === 9 && rec.bar === 9 && rec.baz === 9 ? true : rec && typeof rec === "object" && rec.foo === 10 && rec.bar === 10 && rec.baz === 10 ? true : false
    })

bench
    .run()
    .then(() => tinybenchPrinter.toMarkdown(bench))
    // eslint-disable-next-line no-console
    .then(console.log)
