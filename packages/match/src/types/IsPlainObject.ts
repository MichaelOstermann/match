export type IsPlainObject<T> = T extends object
    ? T extends any[]
        ? false
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        : T extends Function
            ? false
            : true
    : false
