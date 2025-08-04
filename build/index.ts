/**
 * 库模块分类
 * @param moduleName
 * @returns
 */
export const useLibraryModuleClassify = (moduleName: string, modulePath: string) => {
  // 1) Vue 生态相关
  if (moduleName == 'vue' || moduleName == '@vue') {
    return 'vue-core'
  }
  if (moduleName.startsWith('vue-router')) {
    return 'vue-router'
  }
  if (moduleName.startsWith('pinia')) {
    return 'pinia'
  }
  if (moduleName.startsWith('@vueuse')) {
    return 'vueuse'
  }

  // 2) Element Plus
  if (moduleName.startsWith('element-plus') || moduleName.startsWith('@element-plus')) {
    // 2.1) 图标库
    if (modulePath.includes('@element-plus/icons-vue')) {
      return 'element-plus-icons'
    }

    // 2.2) 组件
    // TODO: 表单组件合并分类
    if (modulePath.includes('element-plus/es/components')) {
      const match = /\/components\/(.+?)\//.exec(modulePath)
      return match ? `element-plus-${match[1]}` : 'element-plus-components-extra'
    }

    // 2.3) 其他部分
    if (modulePath.includes('element-plus/es')) {
      return 'element-plus-core'
    }

    return 'element-plus-extra'
  }

  // 3) 第三方依赖
  if (moduleName.startsWith('lodash-es')) {
    return 'lodash-es'
  }
  if (moduleName.startsWith('axios') || moduleName == 'easy-tools-axios') {
    return 'axios'
  }
  if (moduleName.startsWith('dayjs')) {
    return 'dayjs'
  }

  // ... 其他库

  return ''
}
