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
import type { DynamicFormInstance } from 'components/dynamic-form/index'
import { onMounted, ref } from 'vue'
import { useForm } from './useForm'

defineOptions({
  name: 'form-test'
})

const dynamicFormRef = ref<DynamicFormInstance | null>(null)
const { formModelProps, formProps, formFields, validateForm } = useForm()

// 测试提交
const testSubmit = async () => {
  if (!(await validateForm(dynamicFormRef.value!.formRef as ElementPlus.FormInstance))) { return }
  console.log('校验完毕, 测试提交数据')
}

onMounted(() => {
  console.log('动态表单渲染完成, 动态表单暴露的数据:', dynamicFormRef.value)
})

</script>

<style lang="scss" scoped>
@use "./index.scss" as *;
</style>