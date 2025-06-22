import { defineStore } from 'pinia'
import { ref, computed, nextTick } from 'vue'
import { useAuthrouteStore } from 'stores/authroute'
import { defaultAfterLoginRoute, defaultAfterLogoutRoute } from 'config'
import { login as loginRequest, logout as logoutRequest } from 'api/identity'
import { queryUserInfo } from 'api/user'
import { decodeRedirectQuery } from 'utils/redirectQuery'

export const useUserStore = defineStore(
  'user',
  () => {
    // Token
    const token = ref<string>('')
    // 用户信息
    const userInfo = ref<UserGetUserInfoResponse | null>(null)
    // 用户是否登录
    const isLogged = computed<boolean>(() => !!token.value && !!userInfo.value)

    /**
     * 登录
     * @param forms 登录参数
     * @return Promise<boolean> 是否成功
     */
    const login = async (forms: IdentityLoginRequest, toRouteRaw = defaultAfterLoginRoute) => {
      // 1) 登录后存储 Token
      if (
        await loginRequest(forms)
          .then(({ data: { token: tokenRes } }) => {
            token.value = tokenRes

            return false
          })
          .catch(() => true)
      ) {
        return false
      }

      // 2) 存储用户信息
      if (
        await queryUserInfo()
          .then(({ data }) => {
            userInfo.value = data

            return false
          })
          .catch(() => true)
      ) {
        return false
      }

      // 3) 添加鉴权路由(根据用户信息的权限相关数据进行 "鉴权路由" 的过滤)
      useAuthrouteStore().addAuthRoutes()
      const { $router } = useUserStore()

      // 4) 重定向
      // 跳转登录重定向路由
      const { redirectPath } = $router.currentRoute.value.query
      if (redirectPath) {
        const redirectQuery = decodeRedirectQuery(
          $router.currentRoute.value.query.redirectQuery as string
        )
        $router.replace({ path: redirectPath as string, query: redirectQuery })
      }
      // 默认跳转"登录后配置路由"
      else {
        $router.replace(toRouteRaw)
      }
      return true
    }

    /**
     * 退出登录
     * @return Promise<boolean> 是否成功
     */
    const logout = async (toRouteRaw = defaultAfterLogoutRoute) => {
      // 1) 调用退出登录
      if (
        await logoutRequest()
          .then(() => false)
          .catch(() => true)
      ) {
        return false
      }

      // 2) 重置所有需要清理的 store
      const { $router, $reset } = useUserStore()
      $reset(() => ({
        token: '',
        userInfo: null
      }))

      nextTick(async () => {
        await $router.replace(toRouteRaw)
        // 销毁鉴权路由
        useAuthrouteStore().destroyAuthRoutes()
        console.log('ccccc', $router)
      })

      return true
    }

    return {
      token,
      userInfo,
      isLogged,
      login,
      logout
    }
  },
  {
    persist: [
      {
        key: 'USER_STORE',
        storage: localStorage,
        pick: ['token', 'userInfo']
      }
    ]
  }
)
