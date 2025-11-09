import { match } from "@monstermann/match"
import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"
import { match as tsMatch } from "ts-pattern"

const bench = new Bench()

bench
    .add("@monstermann/match", () => {
        const a = 10
        const b = 10
        const c = 10

        return match
            .shape({ bar: b, baz: c, foo: a })
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
        const a = 10
        const b = 10
        const c = 10

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
    .add("@monstermann/unplugin-match", () => {
        const a = 10
        const b = 10
        const c = 10

        return (match0 => (match0.bar === 0 && match0.baz === 0 && match0.foo === 0)
            ? (true)
            : (match0.bar === 1 && match0.baz === 1 && match0.foo === 1)
                    ? (true)
                    : (match0.bar === 2 && match0.baz === 2 && match0.foo === 2)
                            ? (true)
                            : (match0.bar === 3 && match0.baz === 3 && match0.foo === 3)
                                    ? (true)
                                    : (match0.bar === 4 && match0.baz === 4 && match0.foo === 4)
                                            ? (true)
                                            : (match0.bar === 5 && match0.baz === 5 && match0.foo === 5)
                                                    ? (true)
                                                    : (match0.bar === 6 && match0.baz === 6 && match0.foo === 6)
                                                            ? (true)
                                                            : (match0.bar === 7 && match0.baz === 7 && match0.foo === 7)
                                                                    ? (true)
                                                                    : (match0.bar === 8 && match0.baz === 8 && match0.foo === 8)
                                                                            ? (true)
                                                                            : (match0.bar === 9 && match0.baz === 9 && match0.foo === 9)
                                                                                    ? (true)
                                                                                    : !!((match0.bar === 10 && match0.baz === 10 && match0.foo === 10)))({ bar: b, baz: c, foo: a })
    })

bench
    .run()
    .then(() => tinybenchPrinter.toMarkdown(bench))

    .then(console.log)
