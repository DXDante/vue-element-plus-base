declare namespace Http {
  /**
   * 全局后端请求响接口
   */
  interface IResponseBase<T> {
    code: number
    data: T
    message: string
    success?: boolean
  }

  interface IUseRequestParameters<T> {
    params?: RequestFunctionExtractParam<T>
    requestFunction: T
    immediate?: boolean
    cached?: boolean
    cacheQuantity?: number
  }

  interface IUseRequestListParameters<T> {
    params?: Omit<RequestFunctionExtractParam<T>, 'page' | 'size'>
    dataKey?: keyof RequestFunctionExtractResponse<T>
    pageSize?: number
    pageSizeMax?: number
    requestFunction: T
    immediate?: boolean
    cached?: boolean
    cacheQuantity?: number
  }

  type RequestFunction<P, R> = (parameter?: P) => Promise<Http.IResponseBase<R>>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type RequestFunctionExtractParam<T> = T extends RequestFunction<infer P, any> ? P : never

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type RequestFunctionExtractResponse<T> = T extends RequestFunction<any, infer R> ? R : never

  // 如果后端定义的分页响应类型还包含其他字段, 在这里添加, 应只保留分页数据字段(一般会统一命名字段), 便于类型推断
  type RequestFunctionListDataExcludeKey = 'page' | 'size' | 'total'

  type RequestFunctionOnlyListData<T extends Record<string, unknown>> = Omit<
    T,
    RequestFunctionListDataExcludeKey
  >

  type RequestFunctionGetListDataType<T extends Record<string, unknown>> = T extends {
    [key: string]: (infer R)[]
  }
    ? R
    : never
}
