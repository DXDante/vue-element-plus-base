/**
 * 项目配置
 */

export const debug = import.meta.env.VITE_DEBUG_MODE

// Pinia 全局存储 Key 头配置
export const persistedStateMainKey = ''

// 默认登录后跳转的路由 (统一使用 path 路由, 未添加鉴权路由并导航到某页面时, 无法匹配到路由名称, 只能匹配到路由地址)
export const defaultAfterLoginRoute: VueRouter.RouteLocationRaw = { path: '/main/home' }

// 默认登出后跳转的路由 (统一使用 path 路由, 未添加鉴权路由并导航到某页面时, 无法匹配到路由名称, 只能匹配到路由地址)
export const defaultAfterLogoutRoute: VueRouter.RouteLocationRaw = { path: '/sign-in' }
