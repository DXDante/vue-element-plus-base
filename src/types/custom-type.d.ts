declare type Computed<T> = {
  [K in keyof T]: T[K]
}

declare type Mutate<T> = {
  -readonly [K in keyof T]: T[K]
}

declare type ValueType<T, K> = K extends keyof T ? T[K] : never
