# onCond

`onCond(predicate, fn)`

Like `.cond`, but calls `fn(value)` if matched.

<!-- prettier-ignore -->
```ts
match("Hello world!" as string)
    .onCond(msg => msg.length > 250, msg => `Message "${msg}" is too long`)
    .onCond(msg => msg.length < 100, msg => `Message "${msg}" is too short`)
    .or(false); //=> `Message "Hello world!" is too short`
```
