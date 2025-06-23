/**
 * 项目配置
 */

export const debug = import.meta.env.VITE_DEBUG_MODE

// Pinia 全局存储 Key 头配置
export const persistedStateMainKey = ''

// 默认登录后跳转的路由
export const defaultAfterLoginRoute: VueRouter.RouteLocationRaw = { name: 'main-home' }

// 默认登出后跳转的路由
export const defaultAfterLogoutRoute: VueRouter.RouteLocationRaw = { name: 'sign-in' }
