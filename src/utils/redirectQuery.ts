import { debug } from 'config'

/**
 * 路由重定向参数编码
 * @param value
 */
export const encodeRedirectQuery = (value: VueRouter.LocationQuery) => {
  try {
    return encodeURIComponent(JSON.stringify(value))
  } catch (error) {
    if (debug) {
      console.error('重定向编码失败', error)
    }
    return ''
  }
}

/**
 * 路由重定向参数解码
 * @param value
 */
export const decodeRedirectQuery = (value: string): VueRouter.LocationQuery => {
  try {
    return JSON.parse(decodeURIComponent(value))
  } catch (error) {
    if (debug) {
      console.error('重定向解码失败', error)
    }
    return {}
  }
}
