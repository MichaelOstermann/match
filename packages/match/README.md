<div align="center">

<h1>match</h1>

![Minified](https://img.shields.io/badge/Minified-1.04_KB-blue?style=flat-square&labelColor=%2315161D&color=%2369a1ff) ![Minzipped](https://img.shields.io/badge/Minzipped-309_B-blue?style=flat-square&labelColor=%2315161D&color=%2369a1ff)

**Zero-runtime exhaustive pattern matching.**

[Documentation](https://MichaelOstermann.github.io/match)

</div>

## Features

- Very small size
- Up to 60x faster than ts-pattern
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
match
    .shape({ value: foo })
    .case({ value: 1 }, 2)
    .case({ value: 2 }, 3)
    .or(0)

// Match with predicates:
match
    .shape({ value: foo })
    .cond(v => v.value > 0, "positive")
    .cond(v => v.value < 0, "negative")
    .or("zero")
```

### Unplugin

The unplugin can optimize your code to be as fast as hand-written if/else statements, with the help of the [Oxidation Compiler](https://oxc.rs/), for example:

<!-- prettier-ignore -->
```ts [🐢]
import { match } from "@monstermann/match"

match(value)
    .case(1, 2)
    .case(2, 3)
    .or(4)
```

<!-- prettier-ignore -->
```ts [🚀]
  value === 1 ? 2 
: value === 2 ? 3 
: 4
```

## Benchmarks

### Bun

- Runtime: Bun v1.2.19
- CPU: AMD Ryzen 9 7900 12-Core

| case                        | summary | ops/sec | time/op | margin | samples |
| --------------------------- | :-----: | ------: | ------: | :----: | ------: |
| @monstermann/unplugin-match |   🥇    |     41M |    26ns | ±0.07% |     39M |
| @monstermann/match          |  -15%   |     35M |    32ns | ±0.45% |     32M |
| ts-pattern                  |  -95%   |      2M |   762ns | ±0.33% |      1M |

| shape (object expression)   | summary | ops/sec | time/op | margin | samples |
| --------------------------- | :-----: | ------: | ------: | :----: | ------: |
| @monstermann/unplugin-match |   🥇    |     41M |    27ns | ±0.21% |     38M |
| @monstermann/match          |  -64%   |     15M |    85ns | ±0.65% |     12M |
| ts-pattern                  |  -97%   |      1M |   980ns | ±0.28% |      1M |

| shape (identifier)          | summary | ops/sec | time/op | margin | samples |
| --------------------------- | :-----: | ------: | ------: | :----: | ------: |
| @monstermann/unplugin-match |   🥇    |     41M |    25ns | ±0.06% |     39M |
| @monstermann/match          |  -63%   |     15M |    79ns | ±0.58% |     13M |
| ts-pattern                  |  -97%   |      1M |   975ns | ±0.31% |      1M |

| cond                        | summary | ops/sec | time/op | margin | samples |
| --------------------------- | :-----: | ------: | ------: | :----: | ------: |
| @monstermann/unplugin-match |   🥇    |     41M |    26ns | ±0.13% |     38M |
| @monstermann/match          |  -51%   |     20M |    59ns | ±0.65% |     17M |
| ts-pattern                  |  -76%   |     10M |   138ns | ±0.29% |      7M |

### Node

- Runtime: Node v25.1.0
- CPU: AMD Ryzen 9 7900 12-Core

| case                        | summary | ops/sec | time/op | margin | samples |
| --------------------------- | :-----: | ------: | ------: | :----: | ------: |
| @monstermann/unplugin-match |   🥇    |     42M |    25ns | ±0.09% |     40M |
| @monstermann/match          |  -7.7%  |     39M |    28ns | ±0.63% |     35M |
| ts-pattern                  |  -87%   |      5M |   219ns | ±3.38% |      5M |

| shape (object expression)   | summary | ops/sec | time/op | margin | samples |
| --------------------------- | :-----: | ------: | ------: | :----: | ------: |
| @monstermann/unplugin-match |   🥇    |     42M |    25ns | ±0.04% |     40M |
| @monstermann/match          |  -65%   |     15M |    70ns | ±0.15% |     14M |
| ts-pattern                  |  -98%   |    657K |     2µs | ±7.02% |    608K |

| shape (identifier)          | summary | ops/sec | time/op | margin | samples |
| --------------------------- | :-----: | ------: | ------: | :----: | ------: |
| @monstermann/unplugin-match |   🥇    |     42M |    25ns | ±0.11% |     40M |
| @monstermann/match          |  -66%   |     14M |    72ns | ±0.08% |     14M |
| ts-pattern                  |  -98%   |    658K |     2µs | ±5.66% |    618K |

| cond                        | summary | ops/sec | time/op | margin | samples |
| --------------------------- | :-----: | ------: | ------: | :----: | ------: |
| @monstermann/unplugin-match |   🥇    |     42M |    25ns | ±0.07% |     40M |
| @monstermann/match          |  -12%   |     37M |    29ns | ±0.55% |     34M |
| ts-pattern                  |  -68%   |     14M |    84ns | ±0.60% |     12M |

## Installation

```sh [npm]
npm install @monstermann/match
npm install -D @monstermann/unplugin-match
```

```sh [pnpm]
pnpm add @monstermann/match
pnpm add -D @monstermann/unplugin-match
```

```sh [yarn]
yarn add @monstermann/match
yarn add -D @monstermann/unplugin-match
```

```sh [bun]
bun add @monstermann/match
bun add -D @monstermann/unplugin-match
```

## Setup

```ts [Vite]
// vite.config.ts
import match from "@monstermann/unplugin-match/vite";

export default defineConfig({
    plugins: [match()],
});
```

```ts [Rollup]
// rollup.config.js
import match from "@monstermann/unplugin-match/rollup";

export default {
    plugins: [match()],
};
```

```ts [Rolldown]
// rolldown.config.js
import match from "@monstermann/unplugin-match/rolldown";

export default {
    plugins: [match()],
};
```

```ts [Webpack]
// webpack.config.js
module.exports = {
    plugins: [require("@monstermann/unplugin-match/webpack")()],
};
```

```ts [Rspack]
// rspack.config.js
module.exports = {
    plugins: [require("@monstermann/unplugin-match/rspack")()],
};
```

```ts [ESBuild]
// esbuild.config.js
import { build } from "esbuild";
import match from "@monstermann/unplugin-match/esbuild";

build({
    plugins: [match()],
});
```

## Usage

```ts
import { match } from "@monstermann/match";

// Match a literal or primitive:
match(value);

// Or match an object:
match.shape(value);

// Optionally set a strict return type:
.returnType<Type>()

// Match against a pattern:
.case(value, result)
.onCase(value, (match) => result)

// Or match against a predicate:
.cond((unmatched) => boolean, result)
.onCond((unmatched) => boolean, (match) => result)

// Handle result:
.or(fallback)
.orElse((unmatched) => fallback)
.orThrow()
```

