import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { addRoutes } from 'router'

export const useAuthrouteStore = defineStore('authroute', () => {
  // 鉴权路由管理
  const authRouteManages = reactive<Identity.AuthRouteManage[]>([])

  /**
   * 添加鉴权路由
   * @param routes 路由配置
   */
  const addAuthRoutes = <Identity.AddAuthRoutes>((routes) => {
    authRouteManages.splice(0, authRouteManages.length, ...(addRoutes(routes)))
  })

  /**
   * 销毁鉴权路由
   */
  const destroyAuthRoutes = <Identity.DestroyAuthRoutes>(() => {
    while (authRouteManages.length) { authRouteManages.shift()() }
  })

  return {
    addAuthRoutes,
    destroyAuthRoutes
  }
})