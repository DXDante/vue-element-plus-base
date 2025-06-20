import axios from 'axios'
import qs from 'qs'
import EasyAxios from 'easy-tools-axios'
import { useCommonStore } from 'stores/common'
import { useUserStore } from 'stores/user'

export const easyAxios = new EasyAxios(/** EasyAxios 配置项 */)
  .create(
    axios,
    {
      baseURL: '/api' /** 其他的 axios 配置, 如果你自定义了必须实现相应的行为 */
    },
    qs
  )
  .useRequestInterceptors(
    (config) => {
      // 你可以处理 config 种 headers、data 相关数据
      const { token } = useUserStore()
      config.headers!['Authorization'] = token
      return config
    },
    (error) => {
      // 请求错误的拦截, 做你想做的
      return error
    }
  )
  .useResponseInterceptors(
    (response) => {
      // 响应相关数据
      return response
    },
    (error) => {
      // 响应错误的拦截, 做你想做的
      return error
    }
  )
  .useStatusInterceptors(({ response, disableToast, resolve, reject }) => {
    // disableToast;
    // reject;
    // 服务器端私有状态码的拦截, 控制你的响应使用以不同的 Promise 回调、全局的错误提示等等 (这里主要是你业务级的处理)
    resolve(response.data)
  })
  .useLoading(
    () => useCommonStore().switchLoadingState(true),
    () => useCommonStore().switchLoadingState(false)
  )

export const request = easyAxios.request.bind(easyAxios)
export const streaming = easyAxios.streaming.bind(easyAxios)
export default easyAxios
