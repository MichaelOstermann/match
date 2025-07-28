# orThrow

`orThrow()`

Returns the result, or throws an exception at runtime. Enforces exhaustiveness at compile time.

```ts
import { match } from "@monstermann/match";

match(3 as number)
    .case(1, "one")
    .case(2, "two")
    .orThrow(); //=> Error
//   ~~~~~~~ ❌ Type 'MatchError<3>' has no call signatures. // [!code highlight]
```
