import { defineAsyncComponent, markRaw } from 'vue'

export const dynamicFormConfig = {
  'el-autocomplete': defineAsyncComponent(() => {
    import('element-plus/es/components/autocomplete/style/index')
    return import('element-plus/es/components/autocomplete/index').then((m) => m.default)
  }),
  'el-cascader': defineAsyncComponent(() => {
    import('element-plus/es/components/cascader/style/index')
    return import('element-plus/es/components/cascader/index').then((m) => m.default)
  }),
  'el-checkbox-group': defineAsyncComponent(() => {
    import('element-plus/es/components/checkbox-group/style/index')
    return import('element-plus/es/components/checkbox/index').then((m) => m.ElCheckboxGroup)
  }),
  'el-checkbox': defineAsyncComponent(() => {
    import('element-plus/es/components/checkbox/style/index')
    return import('element-plus/es/components/checkbox/index').then((m) => m.default)
  }),
  'el-checkbox-button': defineAsyncComponent(() => {
    import('element-plus/es/components/checkbox-button/style/index')
    return import('element-plus/es/components/checkbox/index').then((m) => m.ElCheckboxButton)
  }),
  'el-color-picker': defineAsyncComponent(() => {
    import('element-plus/es/components/color-picker/style/index')
    return import('element-plus/es/components/color-picker/index').then((m) => m.default)
  }),
  'el-date-picker': defineAsyncComponent(() => {
    import('element-plus/es/components/date-picker/style/index')
    return import('element-plus/es/components/date-picker/index').then((m) => m.default)
  }),
  'el-input': defineAsyncComponent(() => {
    import('element-plus/es/components/input/style/index')
    return import('element-plus/es/components/input/index').then((m) => m.default)
  }),
  'el-input-number': defineAsyncComponent(() => {
    import('element-plus/es/components/input-number/style/index')
    return import('element-plus/es/components/input-number/index').then((m) => m.default)
  }),
  'el-input-tag': defineAsyncComponent(() => {
    import('element-plus/es/components/input-tag/style/index')
    return import('element-plus/es/components/input-tag/index').then((m) => m.default)
  }),
  'el-mention': defineAsyncComponent(() => {
    import('element-plus/es/components/mention/style/index')
    return import('element-plus/es/components/mention/index').then((m) => m.default)
  }),
  'el-radio-group': defineAsyncComponent(() => {
    import('element-plus/es/components/radio-group/style/index')
    return import('element-plus/es/components/radio/index').then((m) => m.ElRadioGroup)
  }),
  'el-radio': defineAsyncComponent(() => {
    import('element-plus/es/components/radio/style/index')
    return import('element-plus/es/components/radio/index').then((m) => m.default)
  }),
  'el-radio-button': defineAsyncComponent(() => {
    import('element-plus/es/components/radio-button/style/index')
    return import('element-plus/es/components/radio/index').then((m) => m.ElRadioButton)
  }),
  'el-rate': defineAsyncComponent(() => {
    import('element-plus/es/components/rate/style/index')
    return import('element-plus/es/components/rate/index').then((m) => m.default)
  }),
  'el-select': defineAsyncComponent(() => {
    import('element-plus/es/components/select/style/index')
    return import('element-plus/es/components/select/index').then((m) => m.default)
  }),
  'el-option-group': defineAsyncComponent(() => {
    import('element-plus/es/components/option-group/style/index')
    return import('element-plus/es/components/select/index').then((m) => m.ElOptionGroup)
  }),
  'el-option': defineAsyncComponent(() => {
    import('element-plus/es/components/option/style/index')
    return import('element-plus/es/components/select/index').then((m) => m.ElOption)
  }),
  'el-select-v2': defineAsyncComponent(() => {
    import('element-plus/es/components/select-v2/style/index')
    return import('element-plus/es/components/select-v2/index').then((m) => m.default)
  }),
  'el-slider': defineAsyncComponent(() => {
    import('element-plus/es/components/slider/style/index')
    return import('element-plus/es/components/slider/index').then((m) => m.default)
  }),
  'el-switch': defineAsyncComponent(() => {
    import('element-plus/es/components/switch/style/index')
    return import('element-plus/es/components/switch/index').then((m) => m.default)
  }),
  'el-time-picker': defineAsyncComponent(() => {
    import('element-plus/es/components/time-picker/style/index')
    return import('element-plus/es/components/time-picker/index').then((m) => m.default)
  }),
  'el-time-select': defineAsyncComponent(() => {
    import('element-plus/es/components/time-select/style/index')
    return import('element-plus/es/components/time-select/index').then((m) => m.default)
  }),
  'el-transfer': defineAsyncComponent(() => {
    import('element-plus/es/components/transfer/style/index')
    return import('element-plus/es/components/transfer/index').then((m) => m.default)
  }),
  'el-tree-select': defineAsyncComponent(() => {
    import('element-plus/es/components/tree-select/style/index')
    return import('element-plus/es/components/tree-select/index').then((m) => m.default)
  }),
  'el-upload': defineAsyncComponent(() => {
    import('element-plus/es/components/upload/style/index')
    return import('element-plus/es/components/upload/index').then((m) => m.default)
  }),
  'el-button-group': defineAsyncComponent(() => {
    import('element-plus/es/components/button-group/style/index')
    return import('element-plus/es/components/button/index').then((m) => m.ElButtonGroup)
  }),
  'el-button': defineAsyncComponent(() => {
    import('element-plus/es/components/button/style/index')
    return import('element-plus/es/components/button/index').then((m) => m.default)
  })
}

export const dynamicFormComponents: Record<string, Vue.Component> = markRaw(dynamicFormConfig)
