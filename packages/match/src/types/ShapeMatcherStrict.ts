import type { Simplify } from "type-fest"
import type { DropShape } from "./DropShape"
import type { ExcludeMatchedShapes } from "./ExcludeMatchedShapes"
import type { HasShapes } from "./HasShapes"
import type { JoinMatchedShapes } from "./JoinMatchedShapes"
import type { MatchError } from "./MatchError"
import type { PickShape } from "./PickShape"
import type { ShapePatterns } from "./ShapePatterns"

export interface ShapeMatcherStrict<
    Input,
    Output = never,
    Matches = never,
> {
    returnType: MatchError<"Calling `.returnType<T>()` is only allowed directly after `match.shape(...)`">

    case: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : HasShapes<Input> extends true
            ? <const I extends ShapePatterns<Input>>(
                    value: ExcludeMatchedShapes<I, Matches>,
                    result: Output,
                ) => ShapeMatcherStrict<
                    DropShape<Input, I>,
                    Output,
                    JoinMatchedShapes<Matches, I>
                >
            : MatchError<"No shapes left to match against">

    cond: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (<const I extends Input>(predicate: (value: Input) => value is I, result: Output) => ShapeMatcherStrict<
            Exclude<Input, I>,
            Output,
            Matches
        >)
    & ((predicate: (value: Input) => boolean, result: Output) => ShapeMatcherStrict<
        Input,
        Output,
        Matches
    >)

    onCase: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : HasShapes<Input> extends true
            ? <const I extends ShapePatterns<Input>>(
                    value: ExcludeMatchedShapes<I, Matches>,
                    fn: (value: Simplify<PickShape<Input, I>>) => Output,
                ) => ShapeMatcherStrict<
                    DropShape<Input, I>,
                    Output,
                    JoinMatchedShapes<Matches, I>
                >
            : MatchError<"No shapes left to match against">

    onCond: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (<const I extends Input>(predicate: (value: Input) => value is I, fn: (value: I) => Output) => ShapeMatcherStrict<
            Exclude<Input, I>,
            Output,
            Matches
        >)
    & ((predicate: (value: Input) => boolean, fn: (value: Input) => Output) => ShapeMatcherStrict<
        Input,
        Output,
        Matches
    >)

    or: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (fallback: Output) => Output

    orElse: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (fallback: (value: Simplify<Readonly<Input>>) => Output) => Output

    orThrow: [Input] extends [never]
        ? () => Output
        : MatchError<Input>
}
