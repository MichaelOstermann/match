import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"
import { match as tsMatch } from "ts-pattern"
import { match } from "../packages/match/src/match"

const bench = new Bench()

const a = 10 as number
const b = 10 as number
const c = 10 as number

const rec = { bar: b, baz: c, foo: a }

bench
    .add("@monstermann/match", () => {
        return match(rec)
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
        return tsMatch(rec)
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
        // eslint-disable-next-line no-unneeded-ternary
        return rec && typeof rec === "object" && rec.foo === 0 && rec.bar === 0 && rec.baz === 0 ? true : rec && typeof rec === "object" && rec.foo === 1 && rec.bar === 1 && rec.baz === 1 ? true : rec && typeof rec === "object" && rec.foo === 2 && rec.bar === 2 && rec.baz === 2 ? true : rec && typeof rec === "object" && rec.foo === 3 && rec.bar === 3 && rec.baz === 3 ? true : rec && typeof rec === "object" && rec.foo === 4 && rec.bar === 4 && rec.baz === 4 ? true : rec && typeof rec === "object" && rec.foo === 5 && rec.bar === 5 && rec.baz === 5 ? true : rec && typeof rec === "object" && rec.foo === 6 && rec.bar === 6 && rec.baz === 6 ? true : rec && typeof rec === "object" && rec.foo === 7 && rec.bar === 7 && rec.baz === 7 ? true : rec && typeof rec === "object" && rec.foo === 8 && rec.bar === 8 && rec.baz === 8 ? true : rec && typeof rec === "object" && rec.foo === 9 && rec.bar === 9 && rec.baz === 9 ? true : rec && typeof rec === "object" && rec.foo === 10 && rec.bar === 10 && rec.baz === 10 ? true : false
    })

bench
    .run()
    .then(() => tinybenchPrinter.toMarkdown(bench))

    .then(console.log)
