import { cloneDeep } from 'lodash-es'

/**
 * pinia store 重置插件(用于使用组合式创建的 store 时对其进行 $reset 重置会报错的情况, 对齐进行重写)
 * @param param0 
 */
export const storeReset: Pinia.PiniaPlugin = ({ store }) => {
  const initialState = cloneDeep(store.$state)
  store.$reset = () => store.$patch(cloneDeep(initialState))
}

export default storeReset