import type { NodePath } from "@babel/core"
import * as t from "@babel/types"

const imports = new Map<string, t.Identifier>()

export function resetImports(): void {
    imports.clear()
}

export function collectImports(path: NodePath<t.ImportDeclaration>): void {
    const node = path.node

    if (node.source.value !== "@monstermann/match") return

    for (const specifier of node.specifiers) {
        if (!t.isImportSpecifier(specifier)) continue
        if (t.isIdentifier(specifier.imported))
            imports.set(specifier.imported.name, specifier.local)
        else if (t.isStringLiteral(specifier.imported))
            imports.set(specifier.imported.value, specifier.local)
    }
}

export function hasMatchImport(): boolean {
    return imports.has("match")
}

export function isMatchImport(path: NodePath<t.CallExpression>): boolean {
    const matchImport = imports.get("match")
    if (!matchImport) return false
    if (!t.isIdentifier(path.node.callee)) return false
    return path.node.callee.name === matchImport.name
}
