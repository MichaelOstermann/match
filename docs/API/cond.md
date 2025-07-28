# cond

`cond(predicate, result)`

Matches if `predicate(value)` is truthy.

```ts
match(10 as number)
    .cond((num) => num > 0, "positive")
    .cond((num) => num < 0, "negative")
    .or("zero"); //=> "positive"
```
