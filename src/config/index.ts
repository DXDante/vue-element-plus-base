import zhCn from 'element-plus/lib/locale/lang/zh-cn'

/**
 * 项目配置
 */

export const debug = true

// Element-Plus 全局配置
export const elementConfigProviderOptions = {
  locale: zhCn,
  // size: 'default',   // large, default, small
  zIndex: 21,
  // namespace: 'el',
  // button: {
  //   autoInsertSpace: false
  // },
  // message: {
  //   max: 10
  // }
}

// 默认登录后跳转的路由
export const defaultAfterLoginRoute: VueRouter.RouteLocationRaw = { name: 'main-home' }

// 默认登出后跳转的路由
export const defaultAfterLogoutRoute: VueRouter.RouteLocationRaw = { name: 'sign-in' }