import { ref, computed, nextTick } from 'vue'
import { defineStore } from 'pinia'
import router from 'router'
import { useAuthrouteStore } from 'stores/authroute'
import { userTokenStorageKey, userInfoStorageKey } from 'config/storage'

export const useUserStore = defineStore('user', () => {
  // Token
  const token = ref<string>(sessionStorage.getItem(userTokenStorageKey) || '')
  // 用户信息
  const userInfo = ref<Identity.UserInfo>(JSON.parse(sessionStorage.getItem(userInfoStorageKey)))
  // 用户是否登录
  const isLogged = computed<boolean>(() => !!token.value && !!userInfo.value)
  
  /**
   * 登录
   * @param { Identity.ILogin } forms 登录参数
   * @return Promise<boolean>
   */
  const login: Identity.ILogin = (forms) => {
    console.log('登录参数 ', forms)
    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => {
        // 1) 存储 Token、用户信息
        token.value = `TOKEN_${Date.now().toString()}`
        userInfo.value = {
          username: 'Dante',
          phone: '15108373963'
        }

        sessionStorage.setItem(userTokenStorageKey, token.value)
        sessionStorage.setItem(userInfoStorageKey, JSON.stringify(userInfo.value))

        // 2) 添加鉴权路由(根据用户信息的权限相关数据进行 "鉴权路由" 的过滤)
        const { addAuthRoutes: authrouteStoreAddAuthRoutes } = useAuthrouteStore()
        authrouteStoreAddAuthRoutes()

        console.log('已登录')
        nextTick(() => router.replace({ name: 'main-home' }))

        return true
      })
      .catch(() => false)
  }

  /**
   * 退出登录
   */
  const logout: Identity.ILogout = () => {
    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => {
        const userStore = useUserStore()
        userStore.$reset()

        sessionStorage.removeItem(userTokenStorageKey)
        sessionStorage.removeItem(userInfoStorageKey)

        console.log('已退出登录')
        nextTick(() => {
          router.replace({ name: 'sign-in' })
          // 销毁鉴权路由
          setTimeout(() => useAuthrouteStore().destroyAuthRoutes())
        })
        
        return true
      })
      .catch(() => false)
  }

  return {
    token,
    userInfo,
    isLogged,
    login,
    logout
  }
})