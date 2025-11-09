export class AbortError extends Error {}

export function abort(): never {
    throw new AbortError()
}
