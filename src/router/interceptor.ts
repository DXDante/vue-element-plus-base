/**
 * 全局路由拦截器
 */
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'
import useAuthRoute from 'services/use-auth-route'
import { encodeRedirectQuery } from 'utils/redirectQuery'

export const useGlobalInterceptor = (router: VueRouter.Router) => {
  router.beforeEach(async (to, _from, next) => {
    const { name: toName, path: toPath, query: toQuery, matched: toMatched } = to
    const isMatched = !!toMatched.length
    const { isLogged: userStoreIsLogged } = storeToRefs(useUserStore())
    const {
      canAddAuthGlobalRoute,
      canDestroyAuthGlobalRoute,
      addAuthGlobalRoutes,
      destroyAuthRoutes
    } = useAuthRoute()

    // 1) 未登录
    if (!userStoreIsLogged.value) {
      // 未匹配路由 (带上重定向路由地址)
      if (!isMatched) {
        return next({
          replace: true,
          name: 'sign-in',
          // 设置登录重定向路由参数, 稍后在 useUserStore login 最后会解析该参数 (由于没有鉴权路由所以这里路由不能匹配 name、params 模式, 只能使用 path、query 的模式)
          query: { redirectPath: toPath, redirectQuery: encodeRedirectQuery(toQuery) }
        } as VueRouter.RouteLocationRaw)
      }
      // 当鉴权路由内部状态为已添加时, 进行销毁 (只在退出登录跳转登录页时会调用)
      if (canDestroyAuthGlobalRoute.value) {
        destroyAuthRoutes()
      }
    }

    // 2) 添加鉴权路由
    if (canAddAuthGlobalRoute.value) {
      addAuthGlobalRoutes()
      return next({ path: toPath, query: toQuery })
    }

    // 3) 已登录 且 为登录页 / 未匹配
    if (userStoreIsLogged.value && (toName === 'sign-in' || !isMatched)) {
      return next({ replace: true, name: 'main-home' } as VueRouter.RouteLocationRaw)
    }

    // toMatched.some((record) => record.meta.requiresAuth)

    // 4) 默认放行
    next()
  })

  router.afterEach(({ meta: toMeta }) => {
    // 切换页面标题 (自定义任意替换规则 import.meta.env)
    if (typeof toMeta.title == 'string' && toMeta.title != '') {
      ;(document as Document).title = toMeta.title
    }
  })
}

export default useGlobalInterceptor
