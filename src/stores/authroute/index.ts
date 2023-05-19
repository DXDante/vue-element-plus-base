import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { addRoutes } from 'router'
import { authRoutes } from 'router/config'
import { useUserStore } from 'stores/user'

export const useAuthrouteStore = defineStore('authroute', () => {
  // 鉴权路由管理
  const authRouteManages = reactive<Identity.AuthRouteManage[]>([])

  /**
   * 添加鉴权路由()
   */
  const addAuthRoutes: Identity.IAddAuthRoutes = () => {
    const { isLogged: userStoreIsLogged, userInfo: userStoreUserInfo } = useUserStore()

    if (userStoreIsLogged) {
      /********** 测试代码, 根据用户信息相关数据过滤你的鉴权路由 **********/
      userStoreUserInfo;
      authRoutes;
      /********** 测试代码, 根据用户信息相关数据过滤你的鉴权路由 **********/
      authRouteManages.splice(0, authRouteManages.length, ...(addRoutes(authRoutes)))
    }
  }

  /**
   * 销毁鉴权路由
   */
  const destroyAuthRoutes: Identity.DestroyAuthRoutes = () => {
    while (authRouteManages.length) { authRouteManages.shift()() }
  }

  return {
    addAuthRoutes,
    destroyAuthRoutes
  }
})