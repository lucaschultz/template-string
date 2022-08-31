import { PlaceholderDelimiter } from './constants';

type PlaceholderUnion<
  P extends string,
  Prefix extends string = PlaceholderDelimiter.OPEN,
  Suffix extends string = PlaceholderDelimiter.CLOSE
> = P extends `${Prefix}${infer Param}${Suffix}${infer Rest}`
  ? Param | PlaceholderUnion<Rest>
  : P extends `${Prefix}${infer Param}${Suffix}`
  ? Param
  : // eslint-disable-next-line @typescript-eslint/no-unused-vars
  P extends `${infer _Cutoff}${Prefix}${infer Param}${Suffix}${infer Rest}`
  ? Param | PlaceholderUnion<`${Rest}`>
  : never;

export type Placeholders<
  S extends string,
  Prefix extends string = PlaceholderDelimiter.OPEN,
  Suffix extends string = PlaceholderDelimiter.CLOSE
> = {
  [k in PlaceholderUnion<S, Prefix, Suffix>]: string;
};

export type OptionalPlaceholders<
  S extends string,
  Prefix extends string = PlaceholderDelimiter.OPEN,
  Suffix extends string = PlaceholderDelimiter.CLOSE
> = {
  [k in PlaceholderUnion<S, Prefix, Suffix>]?: string;
};

export type FilledFString<
  T extends string,
  M extends { [k: string]: string | undefined },
  A extends string = '',
  Prefix extends string = PlaceholderDelimiter.OPEN,
  Suffix extends string = PlaceholderDelimiter.CLOSE
> = T extends `${Prefix}${Extract<keyof M, string>}${Suffix}${infer R}`
  ? T extends `${Prefix}${infer K}${Suffix}${R}`
    ? FilledFString<R, M, `${A}${M[Extract<K, keyof M>]}`>
    : never
  : T extends `${infer F}${infer R}`
  ? FilledFString<R, M, `${A}${F}`>
  : A;
