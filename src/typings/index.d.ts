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
  }
  namespace Axios {
    export = AxiosTypes
  }
}
