<template>
  <div class="form-test-wrap component-wrap pd d-f flex-ff-c flex-ai-c">
    <dynamic-form ref="dynamicFormRef" :form-model-props="formModelProps" :form-props="formProps" :fields="formFields"
      :form-style="{ width: '500px' }">
      <!---------- input 组件插槽示例 ---------->
      <template #el-input-name-suffix>
        <el-icon class="el-input__icon" color="#ea5413" size="13">
          <User />
        </el-icon>
      </template>
      <!---------- input 组件插槽示例 ---------->
      <!---------- select-v2 组件插槽示例 ---------->
      <template #el-select-v2-count-header>
        表单 count select-v2 头部插槽示例
      </template>
      <!---------- select-v2 组件插槽示例 ---------->
      <!---------- select 组件插槽示例 ---------->
      <template #el-select-region-footer>
        表单 region select 尾部插槽示例
      </template>
      <!---------- select 组件插槽示例 ---------->
    </dynamic-form>
    <div class="btn-wrap bs-b">
      <el-button class="btn" style="margin-top: 20px;" type="primary" round @click.stop="testSubmit">测试提交</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormProps, IFormFields, IsSubType } from 'components/dynamic-form/index'
import DynamicForm from 'components/dynamic-form/index.vue'
import { onMounted, watch, computed, reactive, ref } from 'vue';

defineOptions({
  name: 'form-test'
})

interface FormRule {
  name: string
  count: string
  region: string
}

const countVirtualizedOptions = computed(() => Array.from({ length: 10000 }).map((_, idx) => ({
  label: `${idx + 1}`,
  value: `${idx + 1}`
})))
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

const dynamicFormRef = ref<typeof DynamicForm | null>(null)
// 表单 - model 应该是可变的响应式数据
const formModelProps = reactive<FormRule>({
  name: '',
  count: '',
  region: ''
})
// 表单 - props 应该是不可变的响应式数据
const formProps = computed<FormProps>(() => ({
  labelWidth: "auto",
  statusIcon: true,
  // 组件派发的事件定义示例:
  // onValidate: (prop: ElementPlus.FormItemProp, isValid: boolean, message: string) => {
  //   console.log('dynamicForm emit 的 validate 事件:', prop, isValid, message)
  // }
}))
// 表单 - 表单项 应该是不可变的响应式数据
const formFields = computed<IFormFields[]>(() => ([
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
      rules: [
        { required: true, message: '请选择数量', trigger: 'change' }
      ]
    },
    is: 'el-select-v2',
    isProps: {
      placeholder: '请选择数量',
      options: countVirtualizedOptions.value
    },
    isSlots: ['header']
  },
  // 地区 - select
  {
    formItemProps: {
      label: '地区(select)',
      prop: 'region',
      rules: [
        { required: true, message: '请选择地区', trigger: 'change' }
      ]
    },
    is: 'el-select',
    isProps: {
      placeholder: '请选择地区',
      noDataText: '喔豁, 没得数据'
    },
    isSlots: ['footer'],
    isSubs: regionOptionGroups.value
  }
]))
watch(formModelProps, to => {
  console.log('formModelProps:', { ...to })
})

// 验证表单
const validateForm = async (formRef: ElementPlus.FormInstance) => {
  return formRef.validate()
    .then((res) => {
      if (res === true) { return res }
      return false
    })
    .catch(() => false)
}

// 测试提交
const testSubmit = async () => {
  if (!(await validateForm(dynamicFormRef.value!.formRef))) { return }
  console.log('测试提交数据')
}

onMounted(() => {
  console.log('动态表单渲染完成, 动态表单暴露的数据:', dynamicFormRef.value)
})

/********** 动态异步加载 Element 表单组件 **********/
// const compCache = new Map()
// const compName = ref('el-input')
// const compInstance = shallowRef(null)
// const compLoad = () => {
//   const name = compName.value.replace('el-', '')
//   if (compCache.has(name)) {
//     compInstance.value = compCache.get(name)
//     return
//   }

//   compCache.set(name, (compInstance.value = defineAsyncComponent(() => import(`../../../../node_modules/element-plus/es/components/${name}/index.mjs`))))
// }
// watch(compName, compLoad, { immediate: true })
/********** 动态异步加载 Element 表单组件 **********/
</script>

<style lang="scss" scoped></style>