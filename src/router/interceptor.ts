/**
 * 全局路由拦截器
 */
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user/index'
import { encodeRedirectQuery } from 'utils/redirectQuery'

export const useGlobalInterceptor = (router: VueRouter.Router) => {
  router.beforeEach(async (to, from, next) => {
    const { name: toName, path: toPath, query: toQuery, matched: toMatched } = to
    const isMatched = !!toMatched.length
    const { isLogged: userStoreIsLogged } = storeToRefs(useUserStore())

    // 1) 未登录 且 未匹配 (带上重定向路由地址)
    if (!userStoreIsLogged.value && !isMatched) {
      return next({
        replace: true,
        name: 'sign-in',
        // 设置登录重定向路由参数, 稍后在 useUserStore login 最后会解析该参数 (由于没有鉴权路由所以这里路由不能匹配到 name、params, 只能使用 path、query)
        query: { redirectPath: toPath, redirectQuery: encodeRedirectQuery(toQuery) }
      } as VueRouter.RouteLocationRaw)
    }

    // 2) 已登录 且 为登录页 / 未匹配
    if (userStoreIsLogged.value && (toName === 'sign-in' || !isMatched)) {
      return next({ replace: true, name: 'main-home' } as VueRouter.RouteLocationRaw)
    }

    // toMatched.some((record) => record.meta.requiresAuth)

    // 3) 默认放行
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
