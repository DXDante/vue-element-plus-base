declare type Mutate<T> = {
  -readonly [K in keyof T]: T[K]
}
