declare type Computed<T> = {
  [K in keyof T]: T[K]
}

declare type Mutate<T> = {
  -readonly [K in keyof T]: T[K]
}

declare type ValueType<T, K> = K extends keyof T ? T[K] : never

declare type ValueTypes<T> = T[keyof T]

declare type ValueKebabCaseToPascalCase<T extends string> = T extends `${infer First}-${infer Rest}`
  ? `${Capitalize<First>}${ValueKebabCaseToPascalCase<Rest>}`
  : Capitalize<T>

declare type Parameter<T> = T extends (...rest: [infer P]) => unknown ? P : never
