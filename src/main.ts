import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import pluginComponents from 'plugins/components'

import 'styles/reset-default.css'
import 'styles/common.css'
import 'styles/base.scss'
import 'styles/reset-element.scss'
import 'styles/transition.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(pluginComponents)
app.mount('#app')
