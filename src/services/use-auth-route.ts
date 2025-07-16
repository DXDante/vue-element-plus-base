import { storeToRefs } from 'pinia'
import { addRoutes } from 'router'
import authGlobalRoutes from 'router/config/auth-routes-cofnig'
import { useUserStore } from 'stores/user'
import { computed, ref } from 'vue'

/**
 * 鉴权路由管理
 */
const authRouteManages: Array<() => void> = []
const authRouteGlobalFlag = ref(false)

export default () => {
  // 这里不需要转化为响应式, 因为每次访问都是获取的最新值
  const { isLogged: userStoreIsLogged /*, userInfo: userStoreUserInfo*/ } =
    storeToRefs(useUserStore())
  // 全局路由鉴权添加/销毁判定
  const canAddAuthGlobalRoute = computed(
    () => userStoreIsLogged.value && !authRouteGlobalFlag.value
  )
  const canDestroyAuthGlobalRoute = computed(
    () => !userStoreIsLogged.value && authRouteGlobalFlag.value
  )

  /**
   * 添加"全局鉴权路由"(注意只在路由全局拦截器 beforeEach 中使用)
   */
  const addAuthGlobalRoutes = () => {
    if (!canAddAuthGlobalRoute.value) {
      return
    }

    /********** 测试代码, 根据用户信息相关数据过滤你的鉴权路由 **********/
    // userStoreUserInfo;
    // authGlobalRoutes;
    /********** 测试代码, 根据用户信息相关数据过滤你的鉴权路由 **********/
    authRouteManages.splice(0, authRouteManages.length, ...addRoutes(authGlobalRoutes))
    authRouteGlobalFlag.value = true
  }

  /**
   * 添加"自定义鉴权路由"(注意只在路由全局拦截器 beforeEach 中使用) TODO: 稍后进行
   */
  const addAuthRoutes = (routes: VueRouter.RouteRecordRaw[], parentRouteName?: string) => {
    if (!canAddAuthGlobalRoute.value) {
      return
    }

    /********** 测试代码, 根据用户信息相关数据过滤你的鉴权路由 **********/
    // userStoreUserInfo;
    // authGlobalRoutes;
    /********** 测试代码, 根据用户信息相关数据过滤你的鉴权路由 **********/
    authRouteManages.splice(0, authRouteManages.length, ...addRoutes(routes, parentRouteName))
    authRouteGlobalFlag.value = true
  }

  /**
   * 销毁鉴权路由(所有)
   */
  const destroyAuthRoutes = () => {
    if (!canDestroyAuthGlobalRoute.value) {
      return
    }
    while (authRouteManages.length) {
      // 从头弹出并调用销毁路由
      authRouteManages.shift()!()
    }
    authRouteGlobalFlag.value = false
  }

  return {
    canAddAuthGlobalRoute,
    canDestroyAuthGlobalRoute,
    addAuthGlobalRoutes,
    addAuthRoutes,
    destroyAuthRoutes
  }
}
