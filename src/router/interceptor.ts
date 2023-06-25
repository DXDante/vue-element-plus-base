/**
 * 全局路由拦截器
 */
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user/index'

interface IGlobalInterceptor {
  (router: VueRouter.Router): void
}

export const useGlobalInterceptor: IGlobalInterceptor = (router) => {
  router.beforeEach(async (to, from, next) => {
    from;
    const { name: toName, matched: toMatched } = to
    const isMatched = !!toMatched.length
    const { isLogged: userStoreIsLogged } = storeToRefs(useUserStore())

    // 1) 未匹配跳转 404
    if (!isMatched) {
      return next(<VueRouter.RouteLocationRaw>({
        replace: true,
        name: 'not-found'
      }))
    }

    // 2) 需要鉴权路由且未登录 (带上重定向路由地址)
    if (toMatched.some(record => record.meta.requiresAuth) && !userStoreIsLogged.value) {
      return next(<VueRouter.RouteLocationRaw>({
        replace: true,
        name: 'sign-in',
        query: { redirect: toName }
      }))
    }

    // 3) 已登录且为登录页
    if (userStoreIsLogged.value && toName === 'sign-in') {
      return next(<VueRouter.RouteLocationRaw>({ replace: true, name: 'main-home' }))
    }

    // 4) 默认放行
    next()
  })

  router.afterEach(({ meta: toMeta }) => {
    // 切换页面标题 (自定义任意替换规则 import.meta.env)
    if (typeof toMeta.title == 'string' && toMeta.title != '') {
      (document as Document).title = toMeta.title
    }
  })
 }
 
 export default useGlobalInterceptor
 