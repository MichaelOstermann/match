# match

<Badge type="info" class="size">
    <span>Minified</span>
    <span>1.00 KB</span>
</Badge>

<Badge type="info" class="size">
    <span>Minzipped</span>
    <span>305 B</span>
</Badge>

**Zero-runtime exhaustive pattern matching, inspired by [ts-pattern](https://github.com/gvergnaud/ts-pattern) and [pattycake](https://github.com/aidenybai/pattycake).**

This library is a lightweight alternative to `ts-pattern`, with an optional Babel plugin that compiles `match` expressions to fast, plain JavaScript.

## Features

- Very small size
- Up to 60x faster than ts-pattern
- 600+ tests
- Type-safe exhaustiveness checks
- Match against literals, primitives, and shallow objects
- Eager (`case(pattern, result)`) and lazy (`case(pattern, () => result)`) matching
- Fallback methods: `or`, `orElse`, `orThrow`

## Examples

<!-- prettier-ignore -->
```ts
import { match } from "@monstermann/match"

// Match primitives:
match(value)
    .case(1, 2)
    .case(2, 3)
    .orElse(v => v + 1)

// Match object shapes:
match({ value: foo })
    .shape({ value: 1 }, 2)
    .shape({ value: 2 }, 3)
    .or(0)

// Match with conditions:
match({ value: foo })
    .cond(v => v.value > 0, "positive")
    .cond(v => v.value < 0, "negative")
    .or("zero")
```

### Babel plugin

The Babel plugin can optimize your code to be as fast as hand-written if/else statements.

::: code-group

<!-- prettier-ignore -->
```ts [🐢]
import { match } from "@monstermann/match"

match(value)
    .case(1, 2)
    .case(2, 3)
    .orElse(v => v + 1)
```

<!-- prettier-ignore -->
```ts [🚀]
  value === 1 ? 2 
: value === 2 ? 3 
: value + 1
```

:::
::: code-group

<!-- prettier-ignore -->
```ts [🐢]
import { match } from "@monstermann/match"

match({ value: foo })
    .shape({ value: 1 }, 2)
    .shape({ value: 2 }, 3)
    .or(0)
```

<!-- prettier-ignore -->
```ts [🚀]
  foo === 1 ? 2
: foo === 2 ? 3
: 0
```

:::
::: code-group

<!-- prettier-ignore -->
```ts [🐢]
import { match } from "@monstermann/match"

match({ value: foo })
    .cond(v => v.value > 0, "positive")
    .cond(v => v.value < 0, "negative")
    .or("zero")
```

<!-- prettier-ignore -->
```ts [🚀]
  foo > 0 ? "positive" 
: foo < 0 ? "negative" 
: "zero"
```

:::
::: code-group

<!-- prettier-ignore -->
```ts [🐢]
import { match } from "@monstermann/match"

match(expensive())
    .shape({ value: undefined }, "undefined")
    .cond((v) => isString(v.value), "string")
    .cond((v) => isNumber(v.value), "number")
    .or("unknown")
```

<!-- prettier-ignore -->
```ts [🚀]
((_v) =>
    _v && typeof _v === "object" && _v.value === undefined ? "undefined"
    : isString(_v.value) ? "string"
    : isNumber(_v.value) ? "number"
    : "unknown"
)(expensive())
```

:::

## Benchmarks

- Runtime: Node v24.0.1
- System: Apple M1 Max

| case                            | summary | ops/sec | time/op | margin | samples |
| ------------------------------- | :-----: | ------: | ------: | :----: | ------: |
| @monstermann/babel-plugin-match |   🥇    |     36M |    21ns | ±0.09% |     47M |
| @monstermann/match              |  -29%   |     25M |    33ns | ±0.05% |     30M |
| ts-pattern                      |  -88%   |      4M |   279ns | ±5.25% |      4M |

| shape (object expression)       | summary | ops/sec | time/op | margin | samples |
| ------------------------------- | :-----: | ------: | ------: | :----: | ------: |
| @monstermann/babel-plugin-match |   🥇    |     37M |    21ns | ±0.05% |     49M |
| @monstermann/match              |  -72%   |     10M |   103ns | ±0.56% |     10M |
| ts-pattern                      |  -98%   |    597K |     2µs | ±5.92% |    557K |

| shape (identifier)              | summary | ops/sec | time/op | margin | samples |
| ------------------------------- | :-----: | ------: | ------: | :----: | ------: |
| @monstermann/babel-plugin-match |   🥇    |     37M |    20ns | ±0.08% |     49M |
| @monstermann/match              |  -69%   |     12M |    92ns | ±1.13% |     11M |
| ts-pattern                      |  -98%   |    591K |     2µs | ±1.18% |    562K |

| cond                            | summary | ops/sec | time/op | margin | samples |
| ------------------------------- | :-----: | ------: | ------: | :----: | ------: |
| @monstermann/babel-plugin-match |   🥇    |     34M |    22ns | ±0.04% |     45M |
| @monstermann/match              |  -27%   |     24M |    36ns | ±0.05% |     28M |
| ts-pattern                      |  -73%   |      9M |   134ns | ±6.87% |      7M |

## Installation

::: code-group

```sh [npm]
npm install @monstermann/match
npm install -D @monstermann/babel-plugin-match
```

```sh [pnpm]
pnpm add @monstermann/match
pnpm add -D @monstermann/babel-plugin-match
```

```sh [yarn]
yarn add @monstermann/match
yarn add -D @monstermann/babel-plugin-match
```

```sh [bun]
bun add @monstermann/match
bun add -D @monstermann/babel-plugin-match
```

:::

Please consult your bundler of choice on how to enable Babel plugins, some examples:

::: details vite + @vitejs/plugin-react

::: code-group

```ts [vite]
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => ({
    plugins: [
        react({
            babel: {
                plugins: [["@monstermann/babel-plugin-match"]],
            },
        }),
    ],
}));
```

:::

::: details vite + vite-plugin-babel
::: code-group

```ts [vite]
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

export default defineConfig({
    plugins: [babel()],
});
```

```json [.babelrc.json]
{
    "plugins": [["@monstermann/babel-plugin-match"]]
}
```

:::

## API

### returnType

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

### case

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

### onCase

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

### shape

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

### onShape

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

### cond

`cond(predicate, result)`

Matches if `predicate(value)` is truthy.

```ts
match(10 as number)
    .cond((num) => num > 0, "positive")
    .cond((num) => num < 0, "negative")
    .or("zero"); //=> "positive"
```

### onCond

`onCond(predicate, fn)`

Like `.cond`, but calls `fn(value)` if matched.

<!-- prettier-ignore -->
```ts
match("Hello world!" as string)
    .onCond(msg => msg.length > 250, msg => `Message "${msg}" is too long`)
    .onCond(msg => msg.length < 100, msg => `Message "${msg}" is too short`)
    .or(false); //=> `Message "Hello world!" is too short`
```

### or

`or(fallback)`

Returns the result, otherwise the given fallback.

```ts
import { match } from "@monstermann/match";

match(3 as number)
    .case(1, "one")
    .case(2, "two")
    .or("other"); //=> "other"
```

### orElse

`orElse(fn)`

Returns the result, otherwise calls `fn(value)`.

```ts
import { match } from "@monstermann/match";

match(3 as number)
    .case(1, "one")
    .case(2, "two")
    .orElse((num) => String(num)); //=> "3"
```

### orThrow

`orThrow()`

Returns the result, or throws an exception at runtime. Enforces exhaustiveness at compile time.

```ts
import { match } from "@monstermann/match";

match(3 as number)
    .case(1, "one")
    .case(2, "two")
    .orThrow(); //=> Error
//   ~~~~~~~ ❌ Type 'MatchError<3>' has no call signatures. // [!code error]
```
