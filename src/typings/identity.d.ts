
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

// 登录
export interface ILogin {
  <T>(forms: T): Promise<boolean>
}

// 退出登录
export interface ILogout {
  (): Promise<boolean>
}

/*************************
 * 用户鉴权相关
 */
export type UserInfo = Record<string, any> | null

/*************************
 * 用户鉴权路由相关
 */

export interface IAddRoutes {
  (routeConfigs: VueRouter.RouteRecordRaw[]): Array<() => void>
}

// 鉴权路由管理器(vue-router 动态路由添加后返回的是可销毁路由函数管理器)
export type AuthRouteManage = () => void

// 添加鉴权路由
export type AddAuthRoutes = (routes: VueRouter.RouteRecordRaw[]) => void

// 销毁鉴权路由
export type DestroyAuthRoutes = AuthRouteManage