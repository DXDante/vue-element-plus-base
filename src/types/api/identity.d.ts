/**
 * 用户身份 Identity
 */

/**
 * 登录请求参数
 */
declare interface IdentityLoginRequest {
  phone: string
  password: string
}

/**
 * 登录响应参数
 */
declare interface IdentityLoginResponse {
  token: string
}

/**
 * 登录响应参数
 */
declare type IdentityLogoutResponse = null
