import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
  // 全局 Loading 状态
  const loadingState = ref<boolean>(false)

  /**
   * 切换全局 Loading 状态
   * @param { Boolean } state 状态值(true/false)
   */
  const switchLoadingState = (state: boolean) => {
    if (loadingState.value !== state) {
      loadingState.value = state
    }
  }

  return {
    loadingState,
    switchLoadingState
  }
})