import zhCn from 'element-plus/es/locale/lang/zh-cn'

/**
 * 项目配置
 */

export const debug = true

// Element-Plus 全局配置
export const elementConfigProviderOptions = {
  locale: zhCn,
  // size: 'default',   // large, default, small
  zIndex: 21
  // namespace: 'el',
  // button: {
  //   autoInsertSpace: false,
  //   plain: false,
  //   round: false
  // },
  // link: {
  //   type: 'default',
  //   underline: 'hover'
  // }
  // message: {
  //   max: 10,
  //   grouping: false,
  //   duration: 2000,
  //   showClose: true,
  //   offset: 30,
  //   plain: false
  // },
  // emptyValues: [],
  // valueOnClear: ''
}

// Pinia 全局存储 Key 头配置
export const persistedStateMainKey = ''

// 默认登录后跳转的路由
export const defaultAfterLoginRoute: VueRouter.RouteLocationRaw = { name: 'main-home' }

// 默认登出后跳转的路由
export const defaultAfterLogoutRoute: VueRouter.RouteLocationRaw = { name: 'sign-in' }
