import { createRouter, createWebHashHistory } from 'vue-router'
import baseRoutes from './config/base-routes-config'
import useGlobalInterceptor from './interceptor'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: baseRoutes
})

useGlobalInterceptor(router)

/**
 * 添加路由
 * @param routes 路由配置项
 * @param parentRouteName ?父级路由名称 (默认添加根级)
 */
export const addRoutes = (
  routes: VueRouter.RouteRecordRaw[],
  parentRouteName?: string
): Array<() => void> => {
  if (parentRouteName && parentRouteName !== '') {
    return routes.map((route) => router.addRoute(parentRouteName, route))
  }
  return routes.map((route) => router.addRoute(route))
}

export default router
