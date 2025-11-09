// Excludes the cases that have already been pattern matched, to prevent matching duplicate patterns.
// Otherwise the following would be possible:
/*
    match("foo" as string)
        .case("foo", …)
        .case("foo", …)
*/
export type ExcludeMatchedValues<T, U> = Exclude<T, U>
