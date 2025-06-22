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
}
