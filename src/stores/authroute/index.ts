import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { storeToRefs } from 'pinia'
import router, { addRoutes } from 'router'
import { useUserStore } from 'stores/user'
import { authRoutes } from 'router/config'

export const useAuthrouteStore = defineStore('authroute', () => {
  // 鉴权路由管理
  const authRouteManages = reactive<Identity.AuthRouteManage[]>([])

  /**
   * 添加鉴权路由()
   */
  const addAuthRoutes: Identity.IAddAuthRoutes = () => {
    const { isLogged: userStoreIsLogged, userInfo: userStoreUserInfo } = storeToRefs(useUserStore())

    if (userStoreIsLogged.value) {
      /********** 根据用户信息相关数据过滤你的鉴权路由 **********/
      userStoreUserInfo;
      authRoutes;
      /********** 根据用户信息相关数据过滤你的鉴权路由 **********/
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