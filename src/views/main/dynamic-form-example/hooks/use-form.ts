import type { FormProps, IFormFields, IsSubType } from 'components/dynamic-form/index'
import { computed, watch, reactive } from 'vue'

export interface DynamicFormRule {
  name: string
  region: string
  region2: string[]
  count: string
  date1: string
  date2: string
  delivery: boolean
  type: string[]
  resource: string
  desc: string
  dateAndTime: boolean
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

  const dataProvince = [
    { id: '51', name: '四川省' },
    { id: '52', name: '贵州省' }
  ]
  const dataCity = {
    '51': [
      { id: '5101', name: '成都市' },
      { id: '5107', name: '绵阳市' }
    ],
    '52': [
      { id: '5201', name: '贵阳市' },
      { id: '5203', name: '遵义市' }
    ]
  } as Record<string, Record<string, string>[]>
  const dataRegion = {
    '5101': [
      { id: '510107', name: '武侯区' },
      { id: '510122', name: '双流区' }
    ],
    '5107': [
      { id: '510703', name: '涪城区' },
      { id: '510781', name: '江油市' }
    ],
    '5201': [
      { id: '520102', name: '南明区' },
      { id: '520103', name: '云岩区' }
    ],
    '5203': [
      { id: '520303', name: '汇川区' },
      { id: '520321', name: '遵义县' }
    ]
  } as Record<string, Record<string, string>[]>

  const countOptions = computed(() =>
    Array.from({ length: 10000 }).map((_, idx) => ({
      label: `${idx + 1}`,
      value: `${idx + 1}`
    }))
  )

  const typeOptions = computed<IsSubType[]>(() => [
    { is: 'el-checkbox', isProps: { label: '线上', value: 'online', name: 'type' } },
    { is: 'el-checkbox', isProps: { label: '线下', value: 'offline', name: 'type' } },
    { is: 'el-checkbox', isProps: { label: '推广', value: 'promotion', name: 'type' } },
    { is: 'el-checkbox', isProps: { label: '简易', value: 'simple', name: 'type' } }
  ])

  const resourceOptions = computed<IsSubType[]>(() => [
    { is: 'el-radio', isProps: { label: '赞助', value: 'sponsorship', name: 'resource' } },
    { is: 'el-radio', isProps: { label: '地点', value: 'venue', name: 'resource' } }
  ])

  const queryRegionOptions = async ({ code }: { code: string | undefined }) => {
    const delay = Math.floor(Math.random() * 1000)
    await new Promise((resolve) => setTimeout(resolve, delay < 100 ? 100 : delay))
    if (code?.length == 2) {
      return dataCity[code]
    }
    if (code?.length == 4) {
      return dataRegion[code]
    }

    return dataProvince
  }

  // 表单 - model 应该是可变的响应式数据
  const formModelProps = reactive<DynamicFormRule>({
    name: '',
    region: '',
    region2: [],
    count: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    dateAndTime: true
  })

  // 表单 - rules (可以在这里全局定义, 也可以在 IFormFields 字段中定义, 以下有示例, 当在动态组件 form-item 下自定义层级结构的表单时(使用插槽方案), 需要在这里定义, 因为 IFormFields 里无法定义)
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
    // 地区2 - cascader
    {
      formItemProps: {
        label: '地区2(el-cascader)',
        prop: 'region2',
        rules: [{ required: true, message: '请选择地区2', trigger: 'change' }]
      },
      is: 'el-cascader',
      isProps: {
        props: {
          label: 'name',
          value: 'id',
          lazy: true,
          lazyLoad: async (node, resolve) => {
            const { level, value } = node
            const res = await queryRegionOptions({ code: value as string }).then((res) =>
              res.map((res) => ({
                ...res,
                leaf: level >= 2
              }))
            )
            resolve(res)
          }
        } as ElementPlus.CascaderProps,
        clearable: true,
        placeholder: '请选择地区2'
      }
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
    // 日期、时间组合 (这里可设置 prop 为任意 key, 但是要在 formModelProps 里对应声明并赋值, 值任意填写, 那么就可在模板中指定插槽名为这个 prop 了)
    {
      formItemProps: {
        label: '日期时间选择',
        prop: 'dateAndTime',
        required: true
      },
      formItemSlots: ['default']
    },
    // 及时交付 - switch
    {
      formItemProps: {
        label: '及时交付(switch)',
        prop: 'delivery'
      },
      is: 'el-switch'
    },
    // 活动类型 - checkbox
    {
      formItemProps: {
        label: '活动类型(checkbox)',
        prop: 'type',
        rules: [{ required: true, type: 'array', message: '请选择活动类型', trigger: 'change' }]
      },
      is: 'el-checkbox-group',
      isSubs: typeOptions.value
    },
    // 资源 - radio
    {
      formItemProps: {
        label: '资源(radio)',
        prop: 'resource',
        rules: [{ required: true, message: '请选择资源', trigger: 'change' }]
      },
      is: 'el-radio-group',
      isSubs: resourceOptions.value
    },
    // 活动形式 - input - textarea
    {
      formItemProps: {
        label: '活动形式(input - textarea)',
        prop: 'desc',
        rules: [{ required: true, message: '请输入活动形式', trigger: ['blur', 'change'] }]
      },
      is: 'el-input',
      isProps: {
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 6 },
        maxlength: 1000,
        showWordLimit: true,
        clearable: true,
        resize: 'none',
        placeholder: '请输入活动形式'
      }
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
