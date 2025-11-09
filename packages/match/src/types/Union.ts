export type Union<A, B> = [B] extends [A] ? A : [A] extends [B] ? B : A | B
