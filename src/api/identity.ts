// import { request } from 'services/request'

/**
 * 登录
 * @param forms
 * @return
 */
export const login = async <T>(forms: T): Promise<Http.IResponseBase<IdentityLoginResponse>> => {
  /********** 测试代码 **********/
  console.log('登录表单:', forms)
  return new Promise((resolve) =>
    setTimeout(resolve, 50, {
      code: 200,
      data: {
        token: `TOKEN_${Date.now().toString()}`
      },
      message: '',
      success: true
    })
  )
  /********** 测试代码 **********/

  // return request({
  //   method: 'POST',
  //   interfacePath: '/api/login',
  //   data: forms
  // })
}

/**
 * 登出
 * @param forms
 * @return
 */
export const logout = async (): Promise<Http.IResponseBase<IdentityLogoutResponse>> => {
  /********** 测试代码 **********/
  return new Promise((resolve) =>
    setTimeout(resolve, 50, {
      code: 200,
      data: null,
      message: '',
      success: true
    })
  )
  /********** 测试代码 **********/

  // return request({
  //   method: 'POST',
  //   interfacePath: '/api/logout'
  // })
}
