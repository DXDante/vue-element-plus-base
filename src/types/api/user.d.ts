/**
 * 用户信息响应参数
 */
declare interface UserGetUserInfoResponse {
  username: string
  phone: string
  id: number
  role: number
}

/**
 * 查询用户列表请求参数
 */
declare interface UserGetUserListRequest {
  page: number
  size: number
}

/**
 * 查询用户列表响应参数
 */
declare interface UserGetUserListResponse {
  page: number
  size: number
  total: number
  records: {
    name: string
    avatar: string
    email: string
  }[]
}
