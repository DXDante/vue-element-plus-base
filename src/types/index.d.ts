import type * as VueTypes from 'vue'
import type * as VueRouterTypes from 'vue-router'
import type * as PiniaTypes from 'pinia'
import type * as ElementPlusTypes from 'element-plus'
import type * as AxiosTypes from 'axios'

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

    export type ConfigProviderSizeType = 'large' | 'default' | 'small'
    export type ConfigProviderButtonType = {
      type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
      autoInsertSpace?: boolean
      plain?: boolean
      round?: boolean
    }
    export type ConfigProviderLinkType = {
      type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
      underline?: 'always' | 'hover' | 'never' | boolean
    }
    export type ConfigProviderMessageType = {
      max?: number
      grouping?: boolean
      duration?: number
      showClose?: boolean
      offset?: number
      plain?: boolean
    }
  }
  namespace Axios {
    export = AxiosTypes
  }
}
