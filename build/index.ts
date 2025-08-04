const elForm = new Set(['form', 'form-item'])
const elFormCheckboxRadio = new Set([
  'checkbox-group',
  'checkbox',
  'checkbox-button',
  'radio-group',
  'radio',
  'radio-button'
])
const elFormSelect = new Set(['select', 'option-group', 'option'])
const elFormVirtualSelect = new Set(['select-v2', 'virtual-list'])
const elFormInput = new Set(['input', 'input-number', 'input-tag', 'autocomplete', 'mention'])
const elFormCascader = new Set(['cascader', 'cascader-panel'])
const elFormTimeChoice = new Set(['time-picker', 'time-select'])
const elFormRateSliderSwitch = new Set(['rate', 'slider', 'switch'])
const elDataTable = new Set(['table', 'table-v2'])
const elDataTree = new Set(['tree-select', 'tree', 'tree-v2'])
const elFeedbackMessage = new Set(['message-box', 'message'])
const elButton = new Set(['button-group', 'button'])

/**
 * 库模块分类
 * @param moduleName
 * @returns
 */
export const useLibraryModuleClassify = (moduleName: string, modulePath: string) => {
  // 1) Vue 生态相关
  if (moduleName == 'vue' || moduleName == '@vue') return 'vue-core'
  if (moduleName.startsWith('vue-router')) return 'vue-router'
  if (moduleName.startsWith('pinia')) return 'pinia'
  if (moduleName.startsWith('@vueuse')) return 'vueuse'

  // 2) Element Plus
  if (moduleName.startsWith('element-plus') || moduleName.startsWith('@element-plus')) {
    // 2.1) 图标库
    if (modulePath.startsWith('@element-plus/icons-vue')) return 'element-plus-icons'

    // 2.2) 组件
    if (modulePath.startsWith('element-plus/es/components')) {
      const match = /\/components\/(.+?)\//.exec(modulePath)
      const matchName = match ? match[1] : ''

      // 2.2.1) 表单合并
      if (elForm.has(matchName)) return 'element-plus-form'
      if (elFormCheckboxRadio.has(matchName)) return 'element-plus-form-checkbox-radio'
      if (elFormSelect.has(matchName)) return 'element-plus-form-select'
      if (elFormVirtualSelect.has(matchName)) return 'element-plus-form-virtual-select'
      if (elFormInput.has(matchName)) return 'element-plus-form-input-auto-mention'
      if (elFormCascader.has(matchName)) return 'element-plus-form-cascader'
      if (elFormTimeChoice.has(matchName)) return 'element-plus-form-time-choice'
      if (elFormRateSliderSwitch.has(matchName)) return 'element-plus-form-rate-slider-switch'
      if (elDataTable.has(matchName)) return 'element-plus-table'
      if (elDataTree.has(matchName)) return 'element-plus-tree'
      if (elFeedbackMessage.has(matchName)) return 'element-plus-tree'
      if (elButton.has(matchName)) return 'element-plus-button'

      // console.log('--- ：', moduleName, ' | ', modulePath)

      // 剩余独立打包
      return matchName ? `element-plus-${matchName}` : 'element-plus-components-extra'
    }

    // 2.3) 其他部分
    if (modulePath.startsWith('element-plus/es')) return 'element-plus-core'

    return 'element-plus-extra'
  }

  // 3) 第三方依赖
  if (moduleName.startsWith('lodash-es')) return 'lodash-es'
  if (moduleName.startsWith('axios') || moduleName == 'easy-tools-axios') return 'axios'
  if (moduleName.startsWith('dayjs')) return 'dayjs'

  // ... 其他库

  return ''
}

// 移除控制台日志项
export const removeLogs = [
  'log',
  'warn',
  'error',
  'info',
  'debug',
  'group',
  'groupCollapsed',
  'groupEnd',
  'time',
  'timeEnd',
  'dir'
]
