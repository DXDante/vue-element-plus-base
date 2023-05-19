import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import pluginComponents from 'plugins/components'

import { storeExtendRouter, storeReset } from 'plugins/stores'
import { useAuthrouteStore } from 'stores/authroute'

import 'styles/reset-default.css'
import 'styles/common.css'
import 'styles/base.scss'
import 'styles/reset-element.scss'
import 'styles/transition.scss'

const app = createApp(App)
const pinia = createPinia()

pinia.use(storeExtendRouter)
pinia.use(storeReset)
app.use(pinia)
useAuthrouteStore().addAuthRoutes()
app.use(router)
app.use(pluginComponents)

app.mount('#app')
