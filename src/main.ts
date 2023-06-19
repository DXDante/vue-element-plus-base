import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'

import pluginComponents from 'plugins/components'
import pluginIcons from 'plugins/icons'
import {
  storeExtendRouter as pluginStoreExtendRouter,
  storeReset as pluginStoreReset
} from 'plugins/stores'
import { useAuthrouteStore } from 'stores/authroute'

import 'styles/reset-default.css'
import 'styles/common.css'
import 'styles/base.scss'
import 'styles/reset-element.scss'
import 'styles/transition.scss'

const app = createApp(App)
const pinia = createPinia()

pinia.use(pluginStoreExtendRouter)
pinia.use(pluginStoreReset)
pinia.use(piniaPersist)
app.use(pinia)
useAuthrouteStore().addAuthRoutes()
app.use(router)
app.use(pluginComponents)
app.use(pluginIcons)

app.mount('#app')
