import { ref, reactive } from 'vue'
import { validatePhone } from 'utils/validate'

/**
 * 表单
 * @returns {
 *  formComponentRef  表单组件实例
 *  form              表单字段
 *  formRules         表单验证规则
 *  formValidate      表单验证
 *  formReset         表单重置
 *  formFieldsClear   表单指定字段清除验证
 * }
 */
export const useForm = () => {
  // 表单组件实例
  const formComponentRef = ref<ElementPlus.FormInstance | null>(null)
  // 登录表单
  const form = reactive<IdentityLoginRequest>({
    phone: '',
    password: ''
  })
  // 登录表单校验规则
  const formRules = reactive<ElementPlus.FormRules>({
    phone: [
      { required: true, message: '请输入手机号码', trigger: 'blur' },
      { min: 11, max: 11, message: '请输入正确的手机号码(11位)', trigger: 'blur' },
      {
        validator: (_rule, value, callback) => {
          if (validatePhone(value)) {
            return callback()
          }
          callback(new Error('手机号码不正确'))
        },
        trigger: 'blur'
      }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 8, max: 16, message: '请输入正确密码(8 ~ 16位)', trigger: 'blur' }
    ]
  })

  // 表单验证
  const formValidate = () => {
    return formComponentRef.value?.validate().catch(() => false)
  }

  // 表单重置
  const formReset = (props: Array<ElementPlus.FormItemProp>) => {
    formComponentRef.value?.resetFields(props)
  }

  // 表单清除字段验证
  const formFieldsClear = (props: Array<ElementPlus.FormItemProp>) => {
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
