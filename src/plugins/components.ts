const componentModules = import.meta.glob('components/**/index.vue')
const componentPathRegexp = /\/components\/([a-zA-Z(\-)]*)\/index\.vue/
const componentNameRegexp = /(src|components|index|vue|tsx|\.|\/)/g

/**
 * 全局组件
 * src/components 下的全局组件将统一在此进行全局注册
 */

export default {
  install(app: Vue.App) {
    (Reflect.ownKeys(componentModules) as Array<string>).forEach((modulePath) => {
      if (componentPathRegexp.test(modulePath)) {
        const componentName = modulePath.replace(componentNameRegexp, '')
        app.component(componentName, componentModules[modulePath])
      }
    })
  }
}