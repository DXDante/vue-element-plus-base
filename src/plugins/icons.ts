import * as ElementPlusIcons from '@element-plus/icons-vue'

/**
 * 全局图标组件
 */

export default {
  install(app: Vue.App) {
    for (const [key, component] of Object.entries(ElementPlusIcons)) {
      app.component(key, component)
    }
  }
}