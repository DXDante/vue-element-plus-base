import { storeToRefs } from 'pinia'
import { addRoutes } from 'router'
import { useUserStore } from 'stores/user'
import { computed, ref } from 'vue'

// "全局鉴权路由"管理器
const publicManages: Array<() => void> = []
// "自定义鉴权路由"管理器
const privateManages: Array<() => void> = []
// 全局路由拦截器已添加判定
const addedFlag = ref(false)
// 是否可添加判定(用于路由拦截器中)
let canAddAuthRoute: Vue.ComputedRef<boolean> | null = null
// 是否可销毁判定(用于路由拦截器中)
let canDestroyAuthRoute: Vue.ComputedRef<boolean> | null = null

declare type Mode = 'public' | 'private'

/**
 * 添加鉴权路由
 * @param mode                模式, public 表示用户公共路由权限, private 表示用户私有路由权限
 * @param routes              动态路由集(路由配置最好定义 name 选项, 否则不易在使用时根据指定父路由添加子路由, 重复添加路由将会被内部替换)
 * @param parentRouteName     父组件路由名称
 * @returns
 */
const addAuthRoutes = (
  mode: Mode,
  routes: VueRouter.RouteRecordRaw[],
  parentRouteName?: string
) => {
  const managers = mode === 'public' ? publicManages : privateManages
  managers.push(...addRoutes(routes, parentRouteName))
}

/**
 * 销毁鉴权路由
 * @param mode                模式, public 表示用户公共路由权限, private 表示用户私有路由权限
 * @returns
 */
const destroyAuthRoutes = (mode: Mode) => {
  const managers = mode === 'public' ? publicManages : privateManages
  while (managers.length) {
    // 从头弹出并调用销毁路由
    managers.shift()!()
  }
}

/**
 * 切换已添加判定
 * @param value
 */
const switchAddedFlag = (value: boolean) => {
  addedFlag.value = value
}

export default () => {
  // 这里不需要转化为响应式, 因为每次访问都是获取的最新值
  const { isLogged: userStoreIsLogged /*, userInfo: userStoreUserInfo*/ } =
    storeToRefs(useUserStore())
  canAddAuthRoute = canAddAuthRoute || computed(() => userStoreIsLogged.value && !addedFlag.value)
  canDestroyAuthRoute =
    canDestroyAuthRoute || computed(() => !userStoreIsLogged.value && addedFlag.value)

  return {
    canAddAuthRoute,
    canDestroyAuthRoute,
    addAuthRoutes,
    destroyAuthRoutes,
    switchAddedFlag
  }
}
