import { match } from "@monstermann/match"
import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"
import { match as tsMatch } from "ts-pattern"

const bench = new Bench()

const a = 10
const b = 10
const c = 10

const rec = { bar: b, baz: c, foo: a }

bench
    .add("@monstermann/match", () => {
        return match
            .shape(rec)
            .case({ bar: 0, baz: 0, foo: 0 }, true)
            .case({ bar: 1, baz: 1, foo: 1 }, true)
            .case({ bar: 2, baz: 2, foo: 2 }, true)
            .case({ bar: 3, baz: 3, foo: 3 }, true)
            .case({ bar: 4, baz: 4, foo: 4 }, true)
            .case({ bar: 5, baz: 5, foo: 5 }, true)
            .case({ bar: 6, baz: 6, foo: 6 }, true)
            .case({ bar: 7, baz: 7, foo: 7 }, true)
            .case({ bar: 8, baz: 8, foo: 8 }, true)
            .case({ bar: 9, baz: 9, foo: 9 }, true)
            .case({ bar: 10, baz: 10, foo: 10 }, true)
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
    .add("@monstermann/unplugin-match", () => {
        return (rec.bar === 0 && rec.baz === 0 && rec.foo === 0)
            ? (true)
            : (rec.bar === 1 && rec.baz === 1 && rec.foo === 1)
                    ? (true)
                    : (rec.bar === 2 && rec.baz === 2 && rec.foo === 2)
                            ? (true)
                            : (rec.bar === 3 && rec.baz === 3 && rec.foo === 3)
                                    ? (true)
                                    : (rec.bar === 4 && rec.baz === 4 && rec.foo === 4)
                                            ? (true)
                                            : (rec.bar === 5 && rec.baz === 5 && rec.foo === 5)
                                                    ? (true)
                                                    : (rec.bar === 6 && rec.baz === 6 && rec.foo === 6)
                                                            ? (true)
                                                            : (rec.bar === 7 && rec.baz === 7 && rec.foo === 7)
                                                                    ? (true)
                                                                    : (rec.bar === 8 && rec.baz === 8 && rec.foo === 8)
                                                                            ? (true)
                                                                            : (rec.bar === 9 && rec.baz === 9 && rec.foo === 9)
                                                                                    ? (true)
                                                                                    : !!((rec.bar === 10 && rec.baz === 10 && rec.foo === 10))
    })

bench
    .run()
    .then(() => tinybenchPrinter.toMarkdown(bench))

    .then(console.log)
