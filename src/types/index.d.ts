import type * as VueTypes from 'vue'
import type * as VueRouterTypes from 'vue-router'
import type * as PiniaTypes from 'pinia'
import type * as ElementPlusTypes from 'element-plus'
import type * as AxiosTypes from 'axios'
import type * as DayjsTypes from 'dayjs'

declare global {
  namespace Vue {
    export = VueTypes
  }
  namespace VueRouter {
    export = VueRouterTypes
  }
  namespace Pinia {
    export = PiniaTypes
  }
  namespace ElementPlus {
    export = ElementPlusTypes

    /******************** 扩展 Config Provider 组件类型 ********************/
    export type ConfigProviderOptionsType = Mutate<ElementPlusTypes.ConfigProviderContext>
    export type ConfigProviderLocaleType = NonNullable<
      ValueType<Pick<ElementPlusTypes.ConfigProviderProps, 'locale'>, 'locale'>
    >
    export type ConfigProviderSizeType = NonNullable<
      ValueType<Pick<ElementPlusTypes.ConfigProviderProps, 'size'>, 'size'>
    >
    export type ConfigProviderButtonType = NonNullable<
      ValueType<Pick<ElementPlusTypes.ConfigProviderProps, 'button'>, 'button'>
    >
    export type ConfigProviderLinkType = NonNullable<
      ValueType<Pick<ElementPlusTypes.ConfigProviderProps, 'link'>, 'link'>
    >
    export type ConfigProviderMessageType = NonNullable<
      ValueType<Pick<ElementPlusTypes.ConfigProviderProps, 'message'>, 'message'>
    >
    /******************** 扩展 Config Provider 组件类型 ********************/
  }
  namespace Axios {
    export = AxiosTypes
  }
  namespace Dayjs {
    export = DayjsTypes
  }
}
