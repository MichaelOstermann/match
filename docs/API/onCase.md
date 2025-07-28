# onCase

`onCase(pattern, fn)`

Like `.case`, but calls `fn(value)` if matched. Useful for expensive computations.

```ts
const value = 2 as number;

match(value)
    .onCase(1, (num) => num * -1)
    .onCase(2, (num) => num * -2)
    .onCase(3, (num) => num * -3)
    .orThrow(); //=> -4
```
