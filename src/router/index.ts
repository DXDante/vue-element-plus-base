import { createRouter, createWebHistory } from 'vue-router'
import { baseRoutes } from './config'
import useGlobalInterceptor from './interceptor'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: baseRoutes
})

useGlobalInterceptor(router)

// TODO: 考虑是否把已登录后鉴权的路由在 main.ts store 注册后调用

/**
 * 添加路由
 * @param { Array<RouteRecordRaw> } routeConfigs 路由配置项
 */
export const addRoutes = <Identity.IAddRoutes>((routeConfigs) => {
  return routeConfigs.map((route: VueRouter.RouteRecordRaw) => router.addRoute(route))
})

export default router
