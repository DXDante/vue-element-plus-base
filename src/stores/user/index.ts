import { defineStore } from 'pinia'
import { ref, computed, nextTick } from 'vue'
import { useAuthrouteStore } from 'stores/authroute'
import { userTokenStorageKey, userInfoStorageKey } from 'config/storage'
import { defaultAfterLoginRoute, defaultAfterLogoutRoute } from 'config'
import {
  login as loginRequest,
  logout as logoutRequest,
  queryUserInfo
} from 'api/identity'

export const useUserStore = defineStore('user', () => {
  // Token
  const token = ref<string>(sessionStorage.getItem(userTokenStorageKey) || '')
  // 用户信息
  const userInfo = ref<Identity.IUserInfo | null>(JSON.parse(sessionStorage.getItem(userInfoStorageKey)))
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
      await loginRequest(forms).then(({ data: { token: tokenRes } }) => {
        token.value = tokenRes
        sessionStorage.setItem(userTokenStorageKey, tokenRes)

        return false
      }).catch(() => true)
    ) { return false }

    // 2) 存储用户信息
    if (
      await queryUserInfo().then(({ data }) => {
        userInfo.value = data
        sessionStorage.setItem(userInfoStorageKey, JSON.stringify(data))

        return false
      }).catch(() => true)
    ) { return false }

    // 3) 添加鉴权路由(根据用户信息的权限相关数据进行 "鉴权路由" 的过滤)
    useAuthrouteStore().addAuthRoutes()

    console.log('已登录')
    useUserStore().router.replace(toRouteRaw)

    return true
  }

  /**
   * 退出登录
   */
  const logout: Identity.IUserStoreLogout = async (toRouteRaw = defaultAfterLogoutRoute) => {
    if (
      await logoutRequest().then(() => false).catch(() => true)
    ) { return false }

    const { router, $reset } = useUserStore()
    $reset(() => ({
      token: '',
      userInfo: null
    }))

    sessionStorage.removeItem(userTokenStorageKey)
    sessionStorage.removeItem(userInfoStorageKey)

    console.log('已退出登录')
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
})