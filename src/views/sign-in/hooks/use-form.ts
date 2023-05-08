import { ref, reactive } from 'vue'

type FormValidate = () => Promise<boolean>
type FormReset = (props?: Array<ElementPlus.FormItemProp>) => void
type FormFieldsClear = FormReset

/**
 * 表单
 * @returns {
 *  formComponentRef  { Object }  表单组件实例
 *  form { Object }               表单字段
 *  formRules { Object }          表单验证规则
 *  formValidate { Function }     表单验证
 *  formReset { Function }        表单重置
 *  formFieldsClear { Function }  表单指定字段清除验证
 * }
 */
export const useForm = () => {
  // 表单组件实例
  const formComponentRef = ref<ElementPlus.FormInstance | null>(null)
  // 登录表单
  const form = reactive<Identity.ILoginFormsPhoneAndPassword>({
    phone: '',
    password: ''
  })
  // 登录表单校验规则
  const formRules = reactive<ElementPlus.FormRules>({
    phone: [
      { required: true, message: '请输入手机号码', trigger: 'blur' },
      { min: 11, max: 11, message: '请输入正确的手机号码(11位)', trigger: 'blur' }
      // {
      //   validator: (rule, value, callback) => {
      //     // TODO: 自定义手机号码验证    
      //   },
      //   trigger: 'blur'
      // }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 8, max: 16, message: '请输入正确密码(8 ~ 16位)', trigger: 'blur' }
    ]
  })

  // 表单验证
  const formValidate: FormValidate = () => {
    return formComponentRef.value?.validate().catch(() => false)
  }

  // 表单重置
  const formReset: FormReset = (props) => {
    formComponentRef.value?.resetFields(props)
  }

  // 表单清除字段验证
  const formFieldsClear: FormFieldsClear = (props) => {
    formComponentRef.value?.clearValidate(props)
  }

  return {
    formComponentRef,
    form,
    formRules,
    formValidate,
    formReset,
    formFieldsClear
  }
}