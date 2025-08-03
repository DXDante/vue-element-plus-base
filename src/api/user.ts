import { request } from 'services/request'

/**
 * 查询用户信息
 * @param
 * @return
 */
export const queryUserInfo: Http.RequestFunction<unknown, UserGetUserInfoResponse> = () => {
  /********** 测试代码 **********/
  return new Promise((resolve) =>
    setTimeout(resolve, 1000, {
      code: 200,
      data: {
        username: 'Dante',
        phone: '18900000001',
        id: Date.now(),
        role: 0
      },
      message: '',
      success: true
    })
  )
  /********** 测试代码 **********/

  // return request({
  //   method: 'POST',
  //   interfacePath: '/api/getUserInfo'
  // })
}

/**
 * 查询用户列表
 * @param
 * @return
 */
export const queryUserList: Http.RequestFunction<
  UserGetUserListRequest,
  UserGetUserListResponse
> = (param) => {
  return request({
    method: 'GET',
    interfacePath: '/api/queryUserList',
    data: param
  })
}
