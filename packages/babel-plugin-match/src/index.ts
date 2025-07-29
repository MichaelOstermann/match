import type { PluginObj } from "@babel/core"
import * as t from "@babel/types"
import { build } from "./build"
import { collectImports, hasMatchImport, isMatchImport, resetImports } from "./imports"

export default function (): PluginObj {
    return {
        name: "@monstermann/unplugin-match",
        visitor: {
            Program: {
                enter() {
                    resetImports()
                },
            },
            CallExpression(path) {
                // If we don't have an import { match } from "@monstermann/match" at this point, abort.
                if (!hasMatchImport()) return

                // Check whether this is using the `match` import.
                if (!isMatchImport(path)) return

                // Grab `value` from match(value) and start doing magic.
                const value = path.node.arguments[0]
                if (!t.isExpression(value)) return
                build(path, value)
            },
            ImportDeclaration(path) {
                collectImports(path)
            },
        },
    }
}
