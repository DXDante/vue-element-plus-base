/// <reference path="./image.d.ts" />

import type * as VueTypes from 'vue'
import type * as VueRouterTypes from 'vue-router'
import type * as PiniaTypes from 'pinia'
import type * as ElementPlusTypes from 'element-plus'
import type * as HttpResponseTypes from './http-response'
import type * as IdentityTypes from './identity'

declare global {
  namespace Vue { export = VueTypes }
  namespace VueRouter { export = VueRouterTypes }
  namespace Pinia { export = PiniaTypes }
  namespace ElementPlus { export = ElementPlusTypes }
  namespace HttpResponse { export = HttpResponseTypes }
  namespace Identity { export = IdentityTypes }
}

// // setup 标记组件定义组件选项 - unplugin-vue-define-options
// declare const defineOptions: (options: Record<String, any>) => void