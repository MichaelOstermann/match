import { match } from "@monstermann/match"
import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"
import { match as tsMatch } from "ts-pattern"

const bench = new Bench()

bench
    .add("@monstermann/match", () => {
        const a = 10
        return match
            .shape({ foo: a })
            .cond(v => v.foo === 0, true)
            .cond(v => v.foo === 1, true)
            .cond(v => v.foo === 2, true)
            .cond(v => v.foo === 3, true)
            .cond(v => v.foo === 4, true)
            .cond(v => v.foo === 5, true)
            .cond(v => v.foo === 6, true)
            .cond(v => v.foo === 7, true)
            .cond(v => v.foo === 8, true)
            .cond(v => v.foo === 9, true)
            .cond(v => v.foo === 10, true)
            .or(false)
    })
    .add("ts-pattern", () => {
        const a = 10
        return tsMatch({ foo: a })
            .when(v => v.foo === 0, () => true)
            .when(v => v.foo === 1, () => true)
            .when(v => v.foo === 2, () => true)
            .when(v => v.foo === 3, () => true)
            .when(v => v.foo === 4, () => true)
            .when(v => v.foo === 5, () => true)
            .when(v => v.foo === 6, () => true)
            .when(v => v.foo === 7, () => true)
            .when(v => v.foo === 8, () => true)
            .when(v => v.foo === 9, () => true)
            .when(v => v.foo === 10, () => true)
            .otherwise(() => false)
    })
    .add("@monstermann/unplugin-match", () => {
        const a = 10
        return (match0 => (match0.foo === 0)
            ? (true)
            : (match0.foo === 1)
                    ? (true)
                    : (match0.foo === 2)
                            ? (true)
                            : (match0.foo === 3)
                                    ? (true)
                                    : (match0.foo === 4)
                                            ? (true)
                                            : (match0.foo === 5)
                                                    ? (true)
                                                    : (match0.foo === 6)
                                                            ? (true)
                                                            : (match0.foo === 7)
                                                                    ? (true)
                                                                    : (match0.foo === 8)
                                                                            ? (true)
                                                                            : (match0.foo === 9)
                                                                                    ? (true)
                                                                                    : (match0.foo === 10))({ foo: a })
    })

bench
    .run()
    .then(() => tinybenchPrinter.toMarkdown(bench))

    .then(console.log)
