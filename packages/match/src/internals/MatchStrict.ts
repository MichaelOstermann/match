import type { CasePatterns, DropCase, ExcludeMatchedCases, HasCases, JoinMatchedCases, PickCase } from "./case.js"
import type { MatchError } from "./helpers.js"
import type { DropShape, ExcludeMatchedShapes, HasShapes, JoinMatchedShapes, PickShape, ShapePatterns } from "./shape.js"

export interface MatchStrict<
    Input,
    Output = never,
    MatchedLiterals = never,
    MatchedShapes = never,
> {
    returnType: MatchError<"Calling `.returnType<T>()` is only allowed directly after `match(...)`">

    /**
     * Matches a primitive value (`===`). Returns result if matched.
     *
     * ```ts
     * const value = 2 as number
     *
     * match(value)
     *     .case(1, "one")
     *     .case(2, "two")
     *     .case(3, "three")
     *     .orThrow() //=> "two"
     * ```
     */
    case: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : HasCases<Input> extends true
            ? <const I extends CasePatterns<Input>>(
                    value: ExcludeMatchedCases<I, MatchedLiterals>,
                    result: Output
                ) => MatchStrict<
                    DropCase<Input, I>,
                    Output,
                    JoinMatchedCases<MatchedLiterals, I>,
                    MatchedShapes
                >
            : MatchError<"No primitives left to match against">

    /**
     * Like `.case`, but calls `fn(value)` if matched. Useful for expensive computations.
     *
     * ```ts
     * const value = 2 as number;
     *
     * match(value)
     *     .onCase(1, (num) => num * -1)
     *     .onCase(2, (num) => num * -2)
     *     .onCase(3, (num) => num * -3)
     *     .orThrow(); //=> -4
     * ```
     */
    onCase: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : HasCases<Input> extends true
            ? <const I extends CasePatterns<Input>>(
                    value: ExcludeMatchedCases<I, MatchedLiterals>,
                    fn: (value: PickCase<Input, I>) => Output
                ) => MatchStrict<
                    DropCase<Input, I>,
                    Output,
                    JoinMatchedCases<MatchedLiterals, I>,
                    MatchedShapes
                >
            : MatchError<"No primitives left to match against">

    /**
     * Matches a shallow object shape. All fields must match (`===`), only supports matching primitives.
     *
     * ```ts
     * type Rectangle = {
     *     x: number
     *     y: number
     *     width: number
     *     height: number
     * }
     *
     * type Circle = {
     *     x: number
     *     y: number
     *     radius: number
     * }
     *
     * const value: Rectangle = {
     *     x: 0,
     *     y: 0,
     *     width: 0,
     *     height: 0,
     * }
     *
     * const isEmpty = match(value as Rectangle | Circle)
     *     .shape({ width: 0, height: 0 }, true)
     *     .shape({ radius: 0 }, true)
     *     .or(false) //=> true
     * ```
     */
    shape: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : HasShapes<Input> extends true
            ? <const I extends ShapePatterns<Input>>(
                    value: ExcludeMatchedShapes<I, MatchedShapes>,
                    result: Output
                ) => MatchStrict<
                    DropShape<Input, I>,
                    Output,
                    MatchedLiterals,
                    JoinMatchedShapes<MatchedShapes, I>
                >
            : MatchError<"No shapes left to match against">

    /**
     * Like `.shape`, but calls `fn(value)` if matched. Useful for expensive computations.
     *
     * ```ts
     * type Rectangle = {
     *     kind: "rectangle"
     *     width: number
     *     height: number
     * }
     *
     * type Circle = {
     *     kind: "circle"
     *     radius: number
     * }
     *
     * const value: Rectangle = {
     *     kind: "rectangle",
     *     width: 10,
     *     height: 10,
     * }
     *
     * const area = match(value as Rectangle | Circle)
     *     .shape({ kind: "rectangle" }, rect => rect.width * rect.height)
     *     .shape({ kind: "circle" }, circ => Math.PI * circ.radius ** 2)
     *     .orThrow() //=> 100
     * ```
     */
    onShape: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : HasShapes<Input> extends true
            ? <const I extends ShapePatterns<Input>>(
                    value: ExcludeMatchedShapes<I, MatchedShapes>,
                    fn: (value: PickShape<Input, I>) => Output
                ) => MatchStrict<
                    DropShape<Input, I>,
                    Output,
                    MatchedLiterals,
                    JoinMatchedShapes<MatchedShapes, I>
                >
            : MatchError<"No shapes left to match against">

    /**
     * Matches if `predicate(value)` is truthy.
     *
     * ```ts
     * match(10 as number)
     *     .cond((num) => num > 0, "positive")
     *     .cond((num) => num < 0, "negative")
     *     .or("zero"); //=> "positive"
     * ```
     */
    cond: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (<const I extends Input>(predicate: (value: Input) => value is I, result: Output) => MatchStrict<
            Exclude<Input, I>,
            Output,
            MatchedLiterals,
            MatchedShapes
        >)
    & ((predicate: (value: Input) => boolean, result: Output) => MatchStrict<
        Input,
        Output,
        MatchedLiterals,
        MatchedShapes
    >)

    /**
     * Like `.cond`, but calls `fn(value)` if matched.
     *
     * <!-- prettier-ignore -->
     * ```ts
     * match("Hello world!" as string)
     *     .onCond(msg => msg.length > 250, msg => `Message "${msg}" is too long`)
     *     .onCond(msg => msg.length < 100, msg => `Message "${msg}" is too short`)
     *     .or(false); //=> `Message "Hello world!" is too short`
     * ```
     */
    onCond: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (<const I extends Input>(predicate: (value: Input) => value is I, fn: (value: I) => Output) => MatchStrict<
            Exclude<Input, I>,
            Output,
            MatchedLiterals,
            MatchedShapes
        >)
    & ((predicate: (value: Input) => boolean, fn: (value: Input) => Output) => MatchStrict<
        Input,
        Output,
        MatchedLiterals,
        MatchedShapes
    >)

    /**
     * Returns the result, otherwise the given fallback.
     *
     * ```ts
     * import { match } from "@monstermann/match";
     *
     * match(3 as number)
     *     .case(1, "one")
     *     .case(2, "two")
     *     .or("other"); //=> "other"
     * ```
     */
    or: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (fallback: Output) => Output

    /**
     * Returns the result, otherwise calls `fn(value)`.
     *
     * ```ts
     * import { match } from "@monstermann/match";
     *
     * match(3 as number)
     *     .case(1, "one")
     *     .case(2, "two")
     *     .orElse((num) => String(num)); //=> "3"
     * ```
     */
    orElse: [Input] extends [never]
        ? MatchError<"Match is exhaustive">
        : (fallback: (value: Readonly<Input>) => Output) => Output

    /**
     * Returns the result, or throws an exception at runtime. Enforces exhaustiveness at compile time.
     *
     * ```ts
     * import { match } from "@monstermann/match";
     *
     * match(3 as number)
     *     .case(1, "one")
     *     .case(2, "two")
     *     .orThrow(); //=> Error
     * //   ~~~~~~~ ❌ Type 'MatchError<3>' has no call signatures.
     * ```
     */
    orThrow: [Input] extends [never]
        ? () => Output
        : MatchError<Input>
}
