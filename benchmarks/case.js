import { match } from "@monstermann/match"
import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"
import { match as tsMatch } from "ts-pattern"

const bench = new Bench()

bench
    .add("@monstermann/match", () => {
        const a = 10
        return match(a)
            .case(0, true)
            .case(1, true)
            .case(2, true)
            .case(3, true)
            .case(4, true)
            .case(5, true)
            .case(6, true)
            .case(7, true)
            .case(8, true)
            .case(9, true)
            .case(10, true)
            .or(false)
    })
    .add("ts-pattern", () => {
        const a = 10
        return tsMatch(a)
            .with(0, () => true)
            .with(1, () => true)
            .with(2, () => true)
            .with(3, () => true)
            .with(4, () => true)
            .with(5, () => true)
            .with(6, () => true)
            .with(7, () => true)
            .with(8, () => true)
            .with(9, () => true)
            .with(10, () => true)
            .otherwise(() => false)
    })
    .add("@monstermann/unplugin-match", () => {
        const a = 10
        return a === (0)
            ? (true)
            : a === (1)
                ? (true)
                : a === (2)
                    ? (true)
                    : a === (3)
                        ? (true)
                        : a === (4)
                            ? (true)
                            : a === (5)
                                ? (true)
                                : a === (6)
                                    ? (true)
                                    : a === (7)
                                        ? (true)
                                        : a === (8)
                                            ? (true)
                                            : a === (9)
                                                ? (true)
                                                : a === (10)
    })

bench
    .run()
    .then(() => tinybenchPrinter.toMarkdown(bench))

    .then(console.log)
