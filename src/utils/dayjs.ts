import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(customParseFormat)
dayjs.extend(isBetween)
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

/**
 * 格式化 - 日期
 * @param date
 * @param format
 */
export const formatDate = (date?: Dayjs.ConfigType, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format)
}

/**
 * 格式化 - 时间
 * @param date
 * @param format
 */
export const formatTime = (date?: Dayjs.ConfigType, format = 'HH:mm:ss') => {
  return dayjs(date).format(format)
}

/**
 * 格式化 - 日期时间
 * @param date
 * @param format
 */
export const formatDateTime = (date?: Dayjs.ConfigType, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(format)
}

export default dayjs
