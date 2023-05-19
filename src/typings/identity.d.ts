
/**
 * 用户身份 Identity
 */

/*************************
 * 登录相关
 */
// 帐号密码表单接口
export interface ILoginFormsPhoneAndPassword {
  phone: string;
  password: string;
}

// 登录返回
export interface ILoginResult {
  token: string
}

// 登录
export interface ILogin {
  <T>(forms: T): Promise<HttpResponse.IResponse<ILoginResult>>
}

// 用户 Store 登录
export interface IUserStoreLogin {
  <T>(forms: T, toRouteRaw?: VueRouter.RouteLocationRaw): Promise<boolean>
}

// 登出
export interface ILogout {
  (): Promise<HttpResponse.IResponse<unknown>>
}

// 用户 Store 登出
export interface IUserStoreLogout {
  (toRouteRaw?: VueRouter.RouteLocationRaw): Promise<boolean>
}

/*************************
 * 用户鉴权相关
 */
// 用户信息
export interface IUserInfo {
  username: string
  phone: string
  id: number
}

export interface IQueryUserInfo {
  (): Promise<HttpResponse.IResponse<IUserInfo>>
}

/*************************
 * 用户鉴权路由相关
 */

export interface IAddRoutes {
  (routeConfigs: VueRouter.RouteRecordRaw[]): Array<() => void>
}

// 鉴权路由管理器(vue-router 动态路由添加后返回的是可销毁路由函数管理器)
export type AuthRouteManage = () => void

// 添加鉴权路由
export interface IAddAuthRoutes {
  (): void
}

// 销毁鉴权路由
export type DestroyAuthRoutes = AuthRouteManage