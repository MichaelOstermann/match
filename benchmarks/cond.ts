import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"
import { match as tsMatch } from "ts-pattern"
import { match } from "../packages/match/src/match"

const bench = new Bench()

bench
    .add("@monstermann/match", () => {
        const a = 10 as number
        return match({ foo: a })
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
        const a = 10 as number
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
    .add("@monstermann/babel-plugin-match", () => {
        const a = 10 as number
        // eslint-disable-next-line no-unneeded-ternary
        return a === 0 ? true : a === 1 ? true : a === 2 ? true : a === 3 ? true : a === 4 ? true : a === 5 ? true : a === 6 ? true : a === 7 ? true : a === 8 ? true : a === 9 ? true : a === 10 ? true : false
    })

bench
    .run()
    .then(() => tinybenchPrinter.toMarkdown(bench))

    .then(console.log)
