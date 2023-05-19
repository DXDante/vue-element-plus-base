import { markRaw } from 'vue'
import router from 'router'
import { cloneDeep } from 'lodash-es'
import { isFunction, isPlainObject } from 'lodash-es'

/**
 * 扩展路由器
 */
export const storeExtendRouter: Pinia.PiniaPlugin = ({ store }) => {
  store.router = markRaw(router)
}

/**
 * pinia store 重置插件(用于使用组合式创建的 store 时对其进行 $reset 重置会报错的情况, 对齐进行重写)
 */
export const storeReset: Pinia.PiniaPlugin = ({ store }) => {
  const initialState = cloneDeep(store.$state)

  /**
   * 重写 pinia $reset 重置 store
   * @param originalCallback ?重置数据工厂函数(只包括 store 中的 ref、reactive 类型的字段)
   */
  store.$reset = (originalCallback?) => {
    // 使用工厂函数重置指定数据(这可以重置为你理想最原始的数据)
    if (isFunction(originalCallback)) {
      const original = originalCallback()
      if (!isPlainObject(original)) { return }

      const cloneOriginal = cloneDeep(original)
      for(const key in cloneOriginal) {
        if (!(initialState.hasOwnProperty as Object["hasOwnProperty"])(key)) {
          delete cloneOriginal[key]
        }
      }

      store.$patch(cloneOriginal)
      return
    }

    // 重置初始化数据
    store.$patch(cloneDeep(initialState))
  }
}