/**
 * 全局路由拦截器
 */
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'
import useAuthRoute from 'services/use-auth-route'
import { encodeRedirectQuery } from 'utils/redirect-query'
import { isString } from 'lodash-es'
// 鉴权路由
import authPublicRoutes from 'router/config/auth-routes-config'
import authActionRoutes from 'router/config/auth-routes-action-config'

export const useGlobalInterceptor = (router: VueRouter.Router) => {
  router.beforeEach(async (to, _from, next) => {
    const { name: toName, path: toPath, query: toQuery, matched: toMatched } = to
    const isMatched = !!toMatched.length
    const { isLogged: userStoreIsLogged, userInfo: userStoreUserInfo } = storeToRefs(useUserStore())
    const {
      canAddAuthRoute,
      canDestroyAuthRoute,
      addAuthRoutes,
      destroyAuthRoutes,
      switchAddedFlag
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
      // 销毁"全局鉴权路由", 内部状态为已添加时进行销毁 (只在退出登录跳转登录页时会调用)
      if (canDestroyAuthRoute.value) {
        destroyAuthRoutes('public')
        destroyAuthRoutes('private')
        switchAddedFlag(false)
      }
    }

    // 2) 添加鉴权路由
    if (canAddAuthRoute.value) {
      // 2.1) 公共鉴权路由
      addAuthRoutes('public', authPublicRoutes)
      // 2.2) 私有鉴权路由 (根据用户权限添加不同位置的路由)
      if (userStoreUserInfo.value?.role === 0) {
        addAuthRoutes('private', authActionRoutes, 'main')
        // ... 继续添加添加不同位置的路由
      }
      switchAddedFlag(true)
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
    if (isString(toMeta.title) && toMeta.title != '') {
      ;(document as Document).title = toMeta.title
    }
  })
}

export default useGlobalInterceptor
