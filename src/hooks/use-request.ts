import { onBeforeUnmount, ref } from 'vue'
import { stringify } from 'qs'

/**
 * 使用请求服务
 * @param params            // 请求参数(传递响应式/普通对象参数, 参数类型必须和 requestFunction 定义请求参数一致, 调用请求器传递参数是临时参数不会合并到 params)
 * @param requestFunction   // 请求函数
 * @param immediate         // 是否立即请求(默认值: false)
 * @param cached            // 是否启用缓存(默认值: false, 当请求参数一致, 直接返回缓存结果, 需要明确后端接口是否相同参数必然返回相同输出)
 * @param cacheQuantity     // 最大缓存数量(默认值: 10, 超过 10 将自动清理, 最大值:10)
 *
 * @example
 * import { someApi } from 'api/xxx'
 *
 * const requestParams = reactive({
 *   param1: 1,
 *   param2: 2
 * })
 *
 * const { data, message, loading, request } = useRequest({
 *   params: requestParams,
 *   requestFunction: someApi
 * })
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRequest = <T extends Http.RequestFunction<any, any>>({
  params,
  requestFunction,
  immediate = false,
  cached = false,
  cacheQuantity = 10
}: Http.IUseRequestParameters<T>) => {
  type ParamType = Http.RequestFunctionExtractParam<T>
  type ParamPartialType = Partial<ParamType>
  type ResponseType = Http.RequestFunctionExtractResponse<T>

  const data = ref<ResponseType | null>(null)
  const loading = ref(false)
  const message = ref('')
  const cacheMap = cached ? new Map<string, ResponseType>() : null

  /**
   * 请求器
   * @param mergeParams 临时合并的请求参数
   */
  const request = async (mergeParams?: ParamPartialType): Promise<ResponseType | null> => {
    loading.value = true
    const requestParams = { ...params, ...mergeParams } as ParamType
    const cacheKey = cached ? `${requestFunction.name}_${stringify(requestParams)}` : null

    // 1) 缓存
    if (cached && cacheMap!.has(cacheKey as string)) {
      data.value = cacheMap!.get(cacheKey as string)
      loading.value = false
      return data.value
    }

    // 2) 请求
    const { data: resData, message: resMessage } = await requestFunction(requestParams)
      .then((res) => {
        // 缓存结果
        if (cached && res.data) {
          if (cacheMap!.size >= cacheQuantity) {
            cacheMap?.delete(cacheMap?.keys().next().value as string)
          }
          cacheMap!.set(cacheKey as string, res.data)
        }
        return res
      })
      .catch((res) => {
        // 返回定义响应结构的数据
        return res
      })

    data.value = resData
    message.value = resMessage

    loading.value = false
    return data.value
  }

  if (cacheQuantity < 0 || cacheQuantity > 10) {
    cacheQuantity = 10
  }

  if (immediate) {
    request()
  }

  /**
   * 清理缓存集
   */
  const clearCache = () => {
    if (!cacheMap) {
      return
    }
    cacheMap.clear()
  }

  onBeforeUnmount(() => {
    clearCache()
  })

  return {
    loading,
    data,
    message,
    request,
    clearCache
  }
}

/**
 * 使用列表请求服务
 * @param params            // 请求参数(传递响应式/普通对象参数, 参数类型必须和 requestFunction 定义请求参数一致, 调用请求器传递参数是临时参数不会合并到 params)
 * @param dataKey           // 响应数据具体列表数据的字段(默认值: records)
 * @param pageSize          // 初始化分页数量(默认值: 20)
 * @param pageSizeMax       // 分页数量最大值(默认值: 50)
 * @param requestFunction   // 请求函数
 * @param immediate         // 是否立即请求(默认值: false)
 * @param cached            // 是否启用缓存(默认值: false, 当请求参数一致, 直接返回缓存结果, 需要明确后端接口是否相同参数必然返回相同输出, 一般来说分页是不会使用缓存的)
 * @param cacheQuantity     // 最大缓存数量(默认值: 10, 超过 10 将自动清理, 最大值:10)
 *
 * @example
 * import { someApi } from 'api/xxx'
 *
 * const otherRequestParams = reactive({
 *   param1: 1,
 *   param2: 2
 * })
 *
 * const { page, size, total, data, message, loading, request, onPageChange, onPageSizeChange, onRefresh } = useRequestList({
 *   params: otherRequestParams,
 *   requestFunction: someApi
 * })
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRequestList = <T extends Http.RequestFunction<any, any>>({
  params,
  dataKey = 'records',
  pageSize = 20,
  pageSizeMax = 50,
  requestFunction,
  immediate = false,
  cached = false,
  cacheQuantity = 10
}: Http.IUseRequestListParameters<T>) => {
  type ParamFullType = Http.RequestFunctionExtractParam<T>
  type ParamPartialType = Partial<Omit<ParamFullType, 'page' | 'size'>>
  type ResponseDataType = Http.RequestFunctionGetListDataType<
    Http.RequestFunctionOnlyListData<Http.RequestFunctionExtractResponse<T>>
  >

  const page = ref(1)
  const size = ref(pageSize)
  const total = ref(0)
  const data = ref<ResponseDataType[]>([])
  const loading = ref(false)
  const message = ref('')
  const cacheMap = cached ? new Map<string, ResponseDataType[]>() : null

  const request = async (mergeParams?: ParamPartialType): Promise<ResponseDataType[]> => {
    loading.value = true
    const requestParams = {
      ...params,
      ...mergeParams,
      page: page.value,
      size: size.value
    } as ParamFullType
    const cacheKey = cached ? `${requestFunction.name}_${stringify(requestParams)}` : null

    // 1) 缓存
    if (cached && cacheMap!.has(cacheKey as string)) {
      data.value = cacheMap!.get(cacheKey as string)!
      loading.value = false
      return data.value as ResponseDataType[]
    }

    // 2) 请求
    const { data: resData, message: resMessage } = await requestFunction(requestParams)
      .then((res) => {
        // 缓存结果
        if (cached && res.data && res.data[dataKey]) {
          if (cacheMap!.size >= cacheQuantity) {
            cacheMap?.delete(cacheMap?.keys().next().value as string)
          }
          cacheMap!.set(cacheKey as string, res.data[dataKey])
        }
        return res
      })
      .catch((res) => {
        // 返回定义响应结构的数据
        res.data = res.data || { [dataKey]: null, message: '服务器响应错误' }
        return res
      })

    if (resData[dataKey] != null) {
      data.value = resData[dataKey]
    }
    if (resData.total != null) {
      total.value = resData.total
    }

    message.value = resMessage
    loading.value = false

    return data.value as ResponseDataType[]
  }

  if (cacheQuantity < 0 || cacheQuantity > 10) {
    cacheQuantity = 10
  }
  if (pageSizeMax <= 0) {
    pageSizeMax = 50
  }

  if (immediate) {
    request()
  }

  /**
   * 分页页码改变
   */
  const onPageChange = (pageParam: number, mergeParams?: ParamPartialType) => {
    if (pageParam < 1 || pageParam > total.value) {
      return
    }
    page.value = pageParam
    return request(mergeParams)
  }

  /**
   * 分页数量改变
   */
  const onPageSizeChange = (pageSizeParam: number, mergeParams?: ParamPartialType) => {
    if (pageSizeParam < 1 || pageSizeParam > pageSizeMax) {
      return
    }
    size.value = pageSizeParam
    return request(mergeParams)
  }

  /**
   * 分页重置
   */
  const onRefresh = (mergeParams?: ParamPartialType) => {
    page.value = 1
    size.value = pageSize
    total.value = 0
    return request(mergeParams)
  }

  /**
   * 清理缓存集
   */
  const clearCache = () => {
    if (!cacheMap) {
      return
    }
    cacheMap.clear()
  }

  onBeforeUnmount(() => {
    clearCache()
  })

  return {
    loading,
    page,
    size,
    total,
    data,
    message,
    request,
    onPageChange,
    onPageSizeChange,
    onRefresh,
    clearCache
  }
}
