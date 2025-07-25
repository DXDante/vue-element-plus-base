import type { InputHandlersType, CheckboxHandlersType } from '../index'
import { onUnmounted } from 'vue'

// 表格 - 编辑项缓存处理器
const inputHandlerCache = new Map<unknown, InputHandlersType>()
// 表格 - 选择项缓存处理器
const checkboxHandlerCache = new Map<unknown, CheckboxHandlersType>()

export const useHandlerCache = () => {
  onUnmounted(() => {
    inputHandlerCache.clear()
    checkboxHandlerCache.clear()
  })

  return {
    inputHandlerCache,
    checkboxHandlerCache
  }
}
