import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import pluginComponents from 'plugins/components'
import pluginIcons from 'plugins/icons'
import {
  storeExtendRouter as pluginStoreExtendRouter,
  storeReset as pluginStoreReset
} from 'plugins/stores'
import { useAuthrouteStore } from 'stores/authroute'
import { persistedStateMainKey } from 'config'

import 'styles/reset-default.css'
import 'styles/common.css'
import 'styles/base.scss'
import 'styles/reset-element.scss'
import 'styles/transition.scss'

const app = createApp(App)
const pinia = createPinia()

pinia.use(pluginStoreExtendRouter)
pinia.use(pluginStoreReset)
pinia.use(
  createPersistedState({
    key: (name) => `${persistedStateMainKey}${name}`
  })
)

app.use(pinia)
// 这里添加鉴权路由必须在使用 pinia 插件后调用(因为添加路由时需要访问 userStore 数据) && 使用路由前调用(先添加鉴权路由表, 否则在刷新页面时不能匹配到当前地址会重定向)
// TODO: 后续可以把添加鉴权路由放在 router.beforeEach 中
useAuthrouteStore().addAuthRoutes()
app.use(router)
app.use(pluginComponents)
app.use(pluginIcons)

app.mount('#app')
