import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import pluginComponents from 'plugins/components'
import { useAuthrouteStore } from 'stores/authroute/index'

import 'styles/reset-default.css'
import 'styles/common.css'
import 'styles/base.scss'
import 'styles/reset-element.scss'
import 'styles/transition.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(pluginComponents)

// TODO: 处理已登录设置鉴权路由
const authrouteStore = useAuthrouteStore()

app.mount('#app')
