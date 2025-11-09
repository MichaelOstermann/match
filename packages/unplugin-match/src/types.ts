import type { FilterPattern } from "unplugin"

export interface Options {
    enforce?: "post" | "pre" | undefined
    exclude?: FilterPattern
    include?: FilterPattern
}
