import type * as VueTypes from 'vue'
import type * as VueRouterTypes from 'vue-router'
import type * as PiniaTypes from 'pinia'
import type * as ElementPlusTypes from 'element-plus'
import type * as Axios from 'axios'
import type * as HttpResponseTypes from './http-response'
import type * as IdentityTypes from './identity'
import type * as UtilTypes from './util'

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
  namespace ElementPlus {
    export = Axios
  }
  namespace HttpResponse {
    export = HttpResponseTypes
  }
  namespace Identity {
    export = IdentityTypes
  }
  namespace Util {
    export = UtilTypes
  }
}
