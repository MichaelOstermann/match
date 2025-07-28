# orElse

`orElse(fn)`

Returns the result, otherwise calls `fn(value)`.

```ts
import { match } from "@monstermann/match";

match(3 as number)
    .case(1, "one")
    .case(2, "two")
    .orElse((num) => String(num)); //=> "3"
```
