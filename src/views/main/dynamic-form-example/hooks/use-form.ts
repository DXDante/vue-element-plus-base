import type { FormProps, IFormFields, IsSubType } from 'components/dynamic-form/index'
import { computed, watch, reactive } from 'vue'

export interface DynamicFormRule {
  name: string
  region: string
  count: string
  date1: string
  date2: string
}

export const useForm = () => {
  const regionOptionGroups = computed<IsSubType[]>(() => [
    {
      is: 'el-option-group',
      isProps: { label: '成都市' },
      isSubs: [
        { is: 'el-option', isProps: { label: '武侯区', value: '1-1' } },
        { is: 'el-option', isProps: { label: '锦江区', value: '1-2' } },
        { is: 'el-option', isProps: { label: '双流区', value: '1-3' } },
        { is: 'el-option', isProps: { label: '高新区', value: '1-4' } }
      ]
    },
    {
      is: 'el-option-group',
      isProps: { label: '绵阳市' },
      isSubs: [
        { is: 'el-option', isProps: { label: '涪城区', value: '2-1' } },
        { is: 'el-option', isProps: { label: '游仙区', value: '2-2' } },
        { is: 'el-option', isProps: { label: '安州区', value: '2-3' } },
        { is: 'el-option', isProps: { label: '江油市', value: '2-4' } }
      ]
    }
  ])

  const countOptions = computed(() =>
    Array.from({ length: 10000 }).map((_, idx) => ({
      label: `${idx + 1}`,
      value: `${idx + 1}`
    }))
  )

  // 表单 - model 应该是可变的响应式数据
  const formModelProps = reactive<DynamicFormRule>({
    name: '',
    region: '',
    count: '',
    date1: '',
    date2: ''
  })

  // 表单 - rules (可以在这里全局定义, 也可以在 IFormFields 字段中定义, 以下有示例, 当在动态组件 form-item 下自定义层级结构的表单时, 需要在这里定义, 因为 IFormFields 里无法定义)
  const formPropRules = computed<ElementPlus.FormRules<DynamicFormRule>>(() => ({
    date1: [{ required: true, message: '请选择日期', trigger: 'change' }],
    date2: [{ required: true, message: '请选择时间', trigger: 'change' }]
  }))

  // 表单 - props 应该是不可变的响应式数据
  const formProps = computed<FormProps>(() => ({
    labelWidth: 'auto',
    statusIcon: true,
    rules: formPropRules.value
    // 组件派发的事件定义示例(在所有组件 props 中定义, 以 on 开头且首字母大写):
    // onValidate: (prop: ElementPlus.FormItemProp, isValid: boolean, message: string) => {
    //   console.log('dynamicForm emit validate event:', prop, isValid, message)
    // }
  }))

  // 表单 - 表单项 应该是不可变的响应式数据
  const formFields = computed<IFormFields[]>(() => [
    // 姓名 - input
    {
      formItemProps: {
        label: '姓名(input)',
        prop: 'name',
        rules: [
          { required: true, message: '请输入姓名', trigger: ['blur', 'change'] },
          { min: 2, max: 10, message: '姓名字符长度在 2 ~ 10 位之间', trigger: ['blur', 'change'] }
        ]
      },
      is: 'el-input',
      isProps: {
        placeholder: '请输入姓名',
        maxlength: 10
      },
      isSlots: ['suffix']
    },
    // 地区 - select
    {
      formItemProps: {
        label: '地区(select)',
        prop: 'region',
        rules: [{ required: true, message: '请选择地区', trigger: 'change' }]
      },
      is: 'el-select',
      isProps: {
        placeholder: '请选择地区',
        noDataText: '喔豁, 没得数据'
      },
      isSlots: ['footer'],
      isSubs: regionOptionGroups.value
    },
    // 数量 - select-v2
    {
      formItemProps: {
        label: '数量(select-v2)',
        prop: 'count',
        rules: [{ required: true, message: '请选择数量', trigger: 'change' }]
      },
      is: 'el-select-v2',
      isProps: {
        placeholder: '请选择数量',
        options: countOptions.value
      },
      isSlots: ['header']
    },
    // 日期、时间组合
    {
      formItemProps: {
        label: '日期时间选择',
        required: true
      },
      formItemSlots: ['default']
    }
  ])

  // 重置表单
  const resetForm = (formRef: ElementPlus.FormInstance) => {
    return formRef.resetFields()
  }

  // 验证表单
  const validateForm = async (formRef: ElementPlus.FormInstance) => {
    return formRef
      .validate()
      .then((res) => {
        if (res === true) {
          return res
        }
        return false
      })
      .catch(() => false)
  }

  watch(formModelProps, (to) => console.log('formModelProps changed:', { ...to }))

  return {
    formModelProps,
    formProps,
    formFields,
    resetForm,
    validateForm
  }
}
