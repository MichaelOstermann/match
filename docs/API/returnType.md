# returnType

`returnType<T>()`

By default, the return type is inferred from your cases. You can enforce a specific type:

<!-- prettier-ignore -->
```ts
match(foo)
    .returnType<"a" | "b" | "c">()
    .case(1, "a")
    .case(2, "b")
    .or("c")
```
