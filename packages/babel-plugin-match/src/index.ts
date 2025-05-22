import * as t from "@babel/types"
import type { PluginObj } from "@babel/core"
import { build } from "./build.js"
import { collectImports, hasMatchImport, isMatchImport, resetImports } from "./imports.js"

export default function (): PluginObj {
    return {
        name: "@monstermann/unplugin-match",
        visitor: {
            Program: {
                enter() {
                    resetImports()
                },
            },
            ImportDeclaration(path) {
                collectImports(path)
            },
            CallExpression(path) {
                // If we don't have an import { match } from "@monstermann/match" at this point, abort.
                if (!hasMatchImport()) return path.stop()

                // Check whether this is using the `match` import.
                if (!isMatchImport(path)) return

                // Grab `value` from match(value) and start doing magic.
                const value = path.node.arguments[0]
                if (!t.isExpression(value)) return
                build(path, value)
            },
        },
    }
}
