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
    const { name: toName, matched: toMatched } = to
    const isMatched = !!toMatched.length
    const { isLogged: userStoreIsLogged } = storeToRefs(useUserStore())

    // 1) 替换至登录, 并带上重定向路由地址(未匹配上地址 或 匹配鉴权集合需要鉴权, 且未登录时替换至登录)
    if ((!isMatched || toMatched.some(record => record.meta.requiresAuth)) && !userStoreIsLogged.value) {
      const query = isMatched ? { redirect: toName } : {}
      return next(<VueRouter.RouteLocationRaw>({ replace: true, name: 'sign-in', query }))
    }

    // 2) 未匹配跳转 404
    if (!isMatched) {
      return next(<VueRouter.RouteLocationRaw>({ replace: true, name: 'not-found' }))
    }

    // 3) 默认放行
    next()
  })

  router.afterEach(({ meta: toMeta }) => {
    // 切换页面标题
    (document as Document).title = toMeta.title as string
  })
 }
 
 export default useGlobalInterceptor
 