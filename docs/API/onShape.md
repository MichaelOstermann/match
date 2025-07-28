# onShape

`onShape(object, fn)`

Like `.shape`, but calls `fn(value)` if matched. Useful for expensive computations.

<!-- prettier-ignore -->
```ts
type Rectangle = {
    kind: "rectangle"
    width: number
    height: number
}

type Circle = {
    kind: "circle"
    radius: number
}

const value: Rectangle = {
    kind: "rectangle",
    width: 10,
    height: 10,
}

const area = match(value as Rectangle | Circle)
    .shape({ kind: "rectangle" }, rect => rect.width * rect.height)
    .shape({ kind: "circle" }, circ => Math.PI * circ.radius ** 2)
    .orThrow() //=> 100
```
