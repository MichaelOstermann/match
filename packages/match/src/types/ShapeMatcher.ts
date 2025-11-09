import type { Simplify } from "type-fest"
import type { DropShape } from "./DropShape"
import type { ExcludeMatchedShapes } from "./ExcludeMatchedShapes"
import type { HasShapes } from "./HasShapes"
import type { JoinMatchedShapes } from "./JoinMatchedShapes"
import type { MatchError } from "./MatchError"
import type { PickShape } from "./PickShape"
import type { ShapeMatcherStrict } from "./ShapeMatcherStrict"
import type { ShapePatterns } from "./ShapePatterns"
import type { Union } from "./Union"

export interface ShapeMatcher<
    Input,
    Output = never,
    Matches = never,
> {
    case: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : HasShapes<Input> extends true
            ? <const I extends ShapePatterns<Input>, O>(
                    value: ExcludeMatchedShapes<I, Matches>,
                    result: O
                ) => ShapeMatcher<
                    DropShape<Input, I>,
                    Union<Output, O>,
                    JoinMatchedShapes<Matches, I>
                >
            : MatchError<"No shapes left to match against">

    cond: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (<const I extends Input, O>(predicate: (value: Input) => value is I, result: O) => ShapeMatcher<
            Exclude<Input, I>,
            Union<Output, O>,
            Matches
        >)
    & (<O>(predicate: (value: Input) => boolean, result: O) => ShapeMatcher<
        Input,
        Union<Output, O>,
        Matches
    >)

    onCase: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : HasShapes<Input> extends true
            ? <const I extends ShapePatterns<Input>, O>(
                    value: ExcludeMatchedShapes<I, Matches>,
                    fn: (value: Simplify<PickShape<Input, I>>) => O
                ) => ShapeMatcher<
                    DropShape<Input, I>,
                    Union<Output, O>,
                    JoinMatchedShapes<Matches, I>
                >
            : MatchError<"No shapes left to match against">

    onCond: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (<const I extends Input, O>(predicate: (value: Input) => value is I, fn: (value: I) => O) => ShapeMatcher<
            Exclude<Input, I>,
            Union<Output, O>,
            Matches
        >)
    & (<O>(predicate: (value: Input) => boolean, fn: (value: Input) => O) => ShapeMatcher<
        Input,
        Union<Output, O>,
        Matches
    >)

    or: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : <O>(fallback: O) => Union<Output, O>

    orElse: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : <O>(fallback: (value: Simplify<Readonly<Input>>) => O) => Union<Output, O>

    orThrow: [Input] extends [never]
        ? () => Output
        : MatchError<Input>

    returnType: [Output] extends [never]
        ? <O>() => ShapeMatcherStrict<Input, O>
        : MatchError<"Calling `.returnType<T>()` is only allowed directly after `match.shape(...)`">
}
