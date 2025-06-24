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
app.use(router)
app.use(pluginComponents)
app.use(pluginIcons)

app.mount('#app')
