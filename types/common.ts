type IdType = number;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type { Prettify, IdType };
