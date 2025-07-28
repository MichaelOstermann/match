# shape

`shape(object, result)`

Matches a shallow object shape. All fields must match (`===`), only supports matching primitives.

<!-- prettier-ignore -->
```ts
type Rectangle = {
    x: number
    y: number
    width: number
    height: number
}

type Circle = {
    x: number
    y: number
    radius: number
}
    
const value: Rectangle = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
}

const isEmpty = match(value as Rectangle | Circle)
    .shape({ width: 0, height: 0 }, true)
    .shape({ radius: 0 }, true)
    .or(false) //=> true
```
