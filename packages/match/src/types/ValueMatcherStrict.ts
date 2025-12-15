import type { DropValue } from "./DropValue"
import type { ExcludeMatchedValues } from "./ExcludeMatchedValues"
import type { JoinMatchedValues } from "./JoinMatchedValues"
import type { MatchError } from "./MatchError"
import type { PickValue } from "./PickValue"

export interface ValueMatcherStrict<
    Input,
    Output = never,
    Matches = never,
> {
    returnType: MatchError<"Calling `.returnType<T>()` is only allowed directly after `match(...)`">

    case: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : <const I extends Input>(
                value: ExcludeMatchedValues<I, Matches>,
                result: Output,
            ) => ValueMatcherStrict<
                DropValue<Input, I>,
                Output,
                JoinMatchedValues<Matches, I>
            >

    cond: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (<const I extends Input>(predicate: (value: Input) => value is I, result: Output) => ValueMatcherStrict<
            Exclude<Input, I>,
            Output,
            Matches
        >)
    & ((predicate: (value: Input) => boolean, result: Output) => ValueMatcherStrict<
        Input,
        Output,
        Matches
    >)

    onCase: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : <const I extends Input>(
                value: ExcludeMatchedValues<I, Matches>,
                fn: (value: PickValue<Input, I>) => Output,
            ) => ValueMatcherStrict<
                DropValue<Input, I>,
                Output,
                JoinMatchedValues<Matches, I>
            >

    onCond: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (<const I extends Input>(predicate: (value: Input) => value is I, fn: (value: I) => Output) => ValueMatcherStrict<
            Exclude<Input, I>,
            Output,
            Matches
        >)
    & ((predicate: (value: Input) => boolean, fn: (value: Input) => Output) => ValueMatcherStrict<
        Input,
        Output,
        Matches
    >)

    or: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (fallback: Output) => Output

    orElse: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (fallback: (value: Readonly<Input>) => Output) => Output

    orThrow: [Input] extends [never]
        ? () => Output
        : MatchError<Input>
}
