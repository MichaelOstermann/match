import type { Options } from "./types"
import transform from "@monstermann/transform-match"
import { createUnplugin } from "unplugin"

export default createUnplugin<Options>(({ enforce, exclude, include } = {}) => {
    return {
        enforce,
        name: "unplugin-match",
        transform: {
            filter: {
                id: {
                    exclude,
                    include: include || [/\.[jt]sx?$/],
                },
            },
            handler(code, id) {
                return transform(code, id)
            },
        },
    }
})
