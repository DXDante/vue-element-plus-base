import type { FormProps, IFormFields, IsSubType } from 'components/dynamic-form/index'
import { computed, watch, reactive } from 'vue'

export interface DynamicFormRule {
  name: string
  count: string
  region: string
}

export const useForm = () => {
  const countOptions = computed(() =>
    Array.from({ length: 10000 }).map((_, idx) => ({
      label: `${idx + 1}`,
      value: `${idx + 1}`
    }))
  )

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

  // 表单 - model 应该是可变的响应式数据
  const formModelProps = reactive<DynamicFormRule>({
    name: '',
    count: '',
    region: ''
  })

  // 表单 - props 应该是不可变的响应式数据
  const formProps = computed<FormProps>(() => ({
    labelWidth: 'auto',
    statusIcon: true
    // 组件派发的事件定义示例:
    // onValidate: (prop: ElementPlus.FormItemProp, isValid: boolean, message: string) => {
    //   console.log('dynamicForm emit 的 validate 事件:', prop, isValid, message)
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
        // suffixIcon: 'User',
        maxlength: 10
      },
      isSlots: ['suffix']
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
    }
  ])

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

  watch(formModelProps, (to) => console.log('formModelProps:', { ...to }))

  return {
    formModelProps,
    formProps,
    formFields,
    validateForm
  }
}
