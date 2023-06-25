// import { request } from 'services/request'

/**
 * 登录
 * @param forms 
 * @return
 */
export const login: Identity.ILogin = async (forms) => {
  /********** 测试代码 **********/
  forms;
  return new Promise(resolve => setTimeout(resolve, 1000, {
    code: 200,
    data: {
      token: `TOKEN_${Date.now().toString()}`
    },
    message: '',
    success: true
  }))
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
export const logout: Identity.ILogout = async () => {
  /********** 测试代码 **********/
  return new Promise(resolve => setTimeout(resolve, 1000, {
    code: 200,
    data: null,
    message: '',
    success: true
  }))
  /********** 测试代码 **********/
  
  // return request({
  //   method: 'POST',
  //   interfacePath: '/api/logout'
  // })
}

/**
 * 查询用户信息
 * @param 
 * @return
 */
export const queryUserInfo: Identity.IQueryUserInfo = () => {
  /********** 测试代码 **********/
  return new Promise(resolve => setTimeout(resolve, 1000, {
    code: 200,
    data: {
      username: 'Dante',
      phone: '15100001111',
      id: Date.now()
    },
    message: '',
    success: true
  }))
  /********** 测试代码 **********/
  
  // return request({
  //   method: 'POST',
  //   interfacePath: '/api/getUserInfo'
  // })
}