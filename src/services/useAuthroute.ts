import { storeToRefs } from 'pinia'
import { addRoutes } from 'router'
import { authRoutes } from 'router/config'
import { useUserStore } from 'stores/user'
import { computed, ref } from 'vue'

/**
 * 鉴权路由管理
 */
const authRouteManages: Array<() => void> = []
const authRouteFlag = ref(false)

export default () => {
  // 这里不需要转化为响应式, 因为每次访问都是获取的最新值
  const { isLogged: userStoreIsLogged /*, userInfo: userStoreUserInfo*/ } =
    storeToRefs(useUserStore())
  const canAddAuthRoute = computed(() => userStoreIsLogged.value && !authRouteFlag.value)
  const canDestroyAuthRoute = computed(() => !userStoreIsLogged.value && authRouteFlag.value)

  /**
   * 添加鉴权路由(注意只在路由全局拦截器 beforeEach 中使用)
   */
  const addAuthRoutes = () => {
    if (!canAddAuthRoute.value) {
      return
    }

    /********** 测试代码, 根据用户信息相关数据过滤你的鉴权路由 **********/
    // userStoreUserInfo;
    // authRoutes;
    /********** 测试代码, 根据用户信息相关数据过滤你的鉴权路由 **********/
    authRouteManages.splice(0, authRouteManages.length, ...addRoutes(authRoutes))
    authRouteFlag.value = true
  }

  /**
   * 销毁鉴权路由
   */
  const destroyAuthRoutes = () => {
    if (!canDestroyAuthRoute.value) {
      return
    }
    while (authRouteManages.length) {
      // 从头弹出并调用销毁路由
      authRouteManages.shift()!()
    }
    authRouteFlag.value = false
  }

  return {
    canAddAuthRoute,
    canDestroyAuthRoute,
    addAuthRoutes,
    destroyAuthRoutes
  }
}
