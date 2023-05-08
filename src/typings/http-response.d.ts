
/**
 * HTTP 后端响应体 HttpResponse
 */

/**
 * 全局后端请求响接口
 */
export interface IResponse<T> {
  code: number
  data: T
  message: string
  success?: boolean
}