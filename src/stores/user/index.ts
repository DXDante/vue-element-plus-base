import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthrouteStore } from 'stores/authroute/index'
import { authRoutes } from 'router/config'

export const useUserStore = defineStore('user', () => {
  // Token
  const token = ref<string>('')
  // 用户信息
  const userInfo = ref<Identity.UserInfo>(null)
  // 用户是否登录
  const isLogged = computed<boolean>(() => !!token.value)
  
  /**
   * 登录
   * @param { Identity.ILogin } forms 登录参数
   * @return Promise<boolean>
   */
  const login = <Identity.ILogin>((forms) => {
    console.log('登录参数 ', forms)
    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => {
        const authrouteStore = useAuthrouteStore()
        // 1) 存储 Token、用户信息
        token.value = `TOKEN_${Date.now().toString()}`
        userInfo.value = {
          username: 'Dante',
          phone: '15108373963'
        }

        // 2) 添加鉴权路由
        // TODO: (1) 这里将 "鉴权路由" authRoutes 移动至 useAuthrouteStore 中导入, 耦合度更高
        // (2) 根据用户信息的权限相关数据进行 "鉴权路由" 的过滤, addAuthRoutes 可传入一个过滤器函数来过滤 router/config 中的鉴权路由
        authrouteStore.addAuthRoutes(authRoutes)

        console.log('已登录')
        return true
      })
      .catch(() => false)
  })

  /**
   * 退出登录
   */
  const logout = <Identity.ILogout>(() => {
    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => {
        const authrouteStore = useAuthrouteStore()
        token.value = ''
        userInfo.value = null
        // 销毁鉴权路由
        authrouteStore.destroyAuthRoutes()

        console.log('已退出登录')
        return true
      })
      .catch(() => false)
  })

  return {
    token,
    userInfo,
    isLogged,
    login,
    logout
  }
})