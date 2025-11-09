import type { SourceMap } from "magic-string"
import { transform } from "./transform"

export default function (
    code: string,
    filePath: string,
): {
    code: string
    map: SourceMap
} | undefined {
    const run = transform(code, filePath)
    if (!run.hasChanged()) return

    return {
        code: run.toString(),
        get map() {
            return run.generateMap({
                hires: "boundary",
                includeContent: true,
                source: filePath,
            })
        },
    }
}
