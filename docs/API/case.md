# case

`case(pattern, result)`

Matches a primitive value (`===`). Returns result if matched.

<!-- prettier-ignore -->
```ts
const value = 2 as number

match(value)
    .case(1, "one")
    .case(2, "two")
    .case(3, "three")
    .orThrow() //=> "two"
```
