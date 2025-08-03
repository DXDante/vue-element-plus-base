import axios from 'axios'
import qs from 'qs'
import EasyAxios from 'easy-tools-axios'
import { useCommonStore } from 'stores/common'
import { useUserStore } from 'stores/user'
import { baseUrl, tokenKey } from 'config/request'

export const easyAxios = new EasyAxios(/** EasyAxios 配置项 */)
  .create(
    axios,
    {
      baseURL: baseUrl /** 其他的 axios 配置, 如果你自定义了必须实现相应的行为 */
    },
    qs
  )
  .useRequestInterceptors(
    (config) => {
      // 你可以处理 config 种 headers、data 相关数据
      const { token } = useUserStore()
      config.headers![tokenKey] = token
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
  .useStatusInterceptors(({ response, /*disableToast,*/ resolve, reject }) => {
    // 服务器端私有状态码的拦截, 控制你的响应使用以不同的 Promise 回调、全局的错误提示等等 (这里主要是你业务级的处理, 应 resolve/reject 项目定义的 Http.IResponseBase 数据类型)
    const {
      data: { code, ...otherData }
    } = response
    if (code === 200) {
      return resolve({ ...otherData, code })
    }
    // ...继续添加其他服务器状态码拦截
    reject({ ...otherData, code })
  })
  .useErrorStatusInterceptors(({ error, /* disableToast,*/ reject }) => {
    // 服务器端错误私有状态码的拦截, 控制你的响应使用以不同的 Promise 回调、全局的错误提示等等 (这里主要是你业务级的处理, 应 reject 项目定义的 Http.IResponseBase 数据类型)
    if (!error.response!.data) {
      return reject({ code: 500, data: null, message: '服务器响应错误' })
    }
    if ((error.response!.data as Http.IResponseBase<unknown>).data === undefined) {
      ;(error.response!.data as Http.IResponseBase<unknown>).data = null
    }
    reject(error.response?.data)
  })
  .useLoading(
    () => useCommonStore().switchLoadingState(true),
    () => useCommonStore().switchLoadingState(false)
  )

export const request = easyAxios.request.bind(easyAxios)
export const streaming = easyAxios.streaming.bind(easyAxios)
export default easyAxios
