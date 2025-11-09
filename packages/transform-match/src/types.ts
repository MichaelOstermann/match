import type MagicString from "magic-string"
import type { CallExpression } from "oxc-parser"

export interface Context {
    code: string
    filePath: string
    ids: Set<string>
    ms: MagicString
    id: (base: string) => string
}

export type Branch =
    | { name: "match", node: CallExpression }
    | { name: "shape", node: CallExpression }
    | { name: "case", node: CallExpression }
    | { name: "onCase", node: CallExpression }
    | { name: "cond", node: CallExpression }
    | { name: "onCond", node: CallExpression }
    | { name: "or", node: CallExpression }
    | { name: "orElse", node: CallExpression }
    | { name: "orThrow", node: CallExpression }
