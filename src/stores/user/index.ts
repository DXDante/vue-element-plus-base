import { defineStore } from 'pinia'
import { ref, computed, nextTick } from 'vue'
import { useAuthrouteStore } from 'stores/authroute'
import { defaultAfterLoginRoute, defaultAfterLogoutRoute } from 'config'
import { login as loginRequest, logout as logoutRequest, queryUserInfo } from 'api/identity'
import { debug } from 'config'

export const useUserStore = defineStore(
  'user',
  () => {
    // Token
    const token = ref<string>('')
    // 用户信息
    const userInfo = ref<Identity.IUserInfo | null>(null)
    // 用户是否登录
    const isLogged = computed<boolean>(() => !!token.value && !!userInfo.value)

    /**
     * 登录
     * @param { Identity.ILoginFormsPhoneAndPassword } forms 登录参数
     * @return Promise<boolean>
     */
    const login: Identity.IUserStoreLogin = async (forms, toRouteRaw = defaultAfterLoginRoute) => {
      // 1) 存储 Token
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

      if (debug) {
        console.log('已登录, 自动跳转配置登录后路由:', toRouteRaw)
      }
      useUserStore().router.replace(toRouteRaw)

      return true
    }

    /**
     * 退出登录
     */
    const logout: Identity.IUserStoreLogout = async (toRouteRaw = defaultAfterLogoutRoute) => {
      if (
        await logoutRequest()
          .then(() => false)
          .catch(() => true)
      ) {
        return false
      }

      const { router, $reset } = useUserStore()
      $reset(() => ({
        token: '',
        userInfo: null
      }))

      if (debug) {
        console.log('已退出登录, 自动跳转配置登出后路由:', toRouteRaw)
      }
      nextTick(() => {
        router.replace(toRouteRaw)
        // 销毁鉴权路由
        setTimeout(() => useAuthrouteStore().destroyAuthRoutes())
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
