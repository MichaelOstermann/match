# or

`or(fallback)`

Returns the result, otherwise the given fallback.

```ts
import { match } from "@monstermann/match";

match(3 as number)
    .case(1, "one")
    .case(2, "two")
    .or("other"); //=> "other"
```
