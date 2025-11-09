import type { DropValue } from "./DropValue"
import type { ExcludeMatchedValues } from "./ExcludeMatchedValues"
import type { JoinMatchedValues } from "./JoinMatchedValues"
import type { MatchError } from "./MatchError"
import type { PickValue } from "./PickValue"
import type { Union } from "./Union"
import type { ValueMatcherStrict } from "./ValueMatcherStrict"

export interface ValueMatcher<
    Input,
    Output = never,
    Matches = never,
> {
    case: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : <const I extends Input, O>(
                value: ExcludeMatchedValues<I, Matches>,
                result: O
            ) => ValueMatcher<
                DropValue<Input, I>,
                Union<Output, O>,
                JoinMatchedValues<Matches, I>
            >

    cond: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (<const I extends Input, O>(predicate: (value: Input) => value is I, result: O) => ValueMatcher<
            Exclude<Input, I>,
            Union<Output, O>,
            Matches
        >)
    & (<O>(predicate: (value: Input) => boolean, result: O) => ValueMatcher<
        Input,
        Union<Output, O>,
        Matches
    >)

    onCase: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : <const I extends Input, O>(
                value: ExcludeMatchedValues<I, Matches>,
                fn: (value: PickValue<Input, I>) => O
            ) => ValueMatcher<
                DropValue<Input, I>,
                Union<Output, O>,
                JoinMatchedValues<Matches, I>
            >

    onCond: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (<const I extends Input, O>(predicate: (value: Input) => value is I, fn: (value: I) => O) => ValueMatcher<
            Exclude<Input, I>,
            Union<Output, O>,
            Matches
        >)
    & (<O>(predicate: (value: Input) => boolean, fn: (value: Input) => O) => ValueMatcher<
        Input,
        Union<Output, O>,
        Matches
    >)

    or: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : <O>(fallback: O) => Union<Output, O>

    orElse: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : <O>(fallback: (value: Readonly<Input>) => O) => Union<Output, O>

    orThrow: [Input] extends [never]
        ? () => Output
        : MatchError<Input>

    returnType: [Output] extends [never]
        ? <O>() => ValueMatcherStrict<Input, O>
        : MatchError<"Calling `.returnType<T>()` is only allowed directly after `match(...)`">
}
