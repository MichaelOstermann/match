import type { Node } from "oxc-parser"
import type { Context } from "./types"
import MagicString from "magic-string"
import { parseSync } from "oxc-parser"
import { walk } from "oxc-walker"
import { collectBranches } from "./collectBranches"
import { transformMatch } from "./transformMatch"
import { transformShape } from "./transformShape"

export function transform(
    code: string,
    filePath: string,
): MagicString {
    const ast = parseSync(filePath, code)
    let ids: Set<string> | undefined
    const parents = new WeakMap<Node, Node>()

    const ctx: Context = {
        code,
        filePath,
        ms: new MagicString(code, { filename: filePath }),
        id(base: string): string {
            let count = 0
            const ids = this.ids
            while (ids.has(`${base}${count}`)) {
                count++
            }
            this.ids.add(`${base}${count}`)
            return `${base}${count}`
        },
        get ids() {
            if (ids) return ids
            ids = new Set<string>()
            walk(ast.program, {
                enter(node) {
                    if (node.type !== "Identifier") return
                    ids!.add(node.name)
                },
            })
            return ids
        },
    }

    walk(ast.program, {
        enter(node, parent) {
            if (parent) parents.set(node, parent)
            const branches = collectBranches(node)
            if (!branches) return
            const parentNode = parents.get(node)
            transformShape(node, branches, parentNode, ctx) || transformMatch(node, branches, parentNode, ctx)
        },
    })

    return ctx.ms
}
