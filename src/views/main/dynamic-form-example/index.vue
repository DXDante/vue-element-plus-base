<template>
  <div class="dynamic-form-example-wrap component-wrap pd d-f flex-ff-c flex-ai-c">
    <h4 class="page-name bs-b">动态表单示例</h4>
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
      <!---------- 当多个表单组件需要定义在行内或者一起时, 这里就用插槽, 并且验证表单组件的 rules 应该定义在 form 的 props 中, 见 hooks/use-form 中 formProps ---------->
      <!---------- 由于该 form-item 项没有配置 prop 字段, 所以后备内容为渲染 form-item 的索引值, 也可以定义一个任意 key 的 prop, 在 formModelProps 里对应声明并赋值, 值任意填写, 就可在这里使用对应名称的插槽 ---------->
      <template #el-form-item-dateAndTime-default>
        <div class="d-f flex-ai-c flex-jc-c bs-b">
          <el-form-item prop="date1" class="flex-item">
            <el-date-picker v-model="formModelProps.date1" value-format="YYYY-MM-DD" aria-label="选择日期"
              placeholder="请选择日期" style="width: 100%;" />
          </el-form-item>
          <div class="d-f flex-ai-c bs-b" style="margin: 0 10px;">-</div>
          <el-form-item prop="date2" class="flex-item">
            <el-time-picker v-model="formModelProps.date2" value-format="HH:mm:ss" aria-label="选择时间" placeholder="请选择时间"
              style="width: 100%" />
          </el-form-item>
        </div>
      </template>
      <!---------- 当多个表单组件需要定义在行内或者一起时, 这里就用插槽, 并且验证表单组件的 rules 应该定义在 form 的 props 中, 见 hooks/use-form 中 formProps ---------->
    </dynamic-form>
    <div class="btn-wrap bs-b">
      <el-button class="btn" style="margin-top: 20px;" type="primary" round @click.stop="testReset">测试重置</el-button>
      <el-button class="btn" style="margin-top: 20px;" type="primary" round @click.stop="testSubmit">测试提交</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DynamicFormInstance } from 'components/dynamic-form/index'
import { onMounted, ref } from 'vue'
import { useForm } from './hooks/use-form'

defineOptions({
  name: 'dynamic-form-example'
})

const dynamicFormRef = ref<DynamicFormInstance | null>(null)

const { formModelProps, formProps, formFields, resetForm, validateForm } = useForm()

// 测试重置
const testReset = async () => {
  resetForm(dynamicFormRef.value!.formRef as ElementPlus.FormInstance)
}

// 测试提交
const testSubmit = async () => {
  if (!(await validateForm(dynamicFormRef.value!.formRef as ElementPlus.FormInstance))) { return }
  const { dateAndTime, ...submitData } = formModelProps
  console.log('validate completed, exclude dateAndTime:', dateAndTime)
  console.log('validate completed:', submitData)
}

onMounted(() => {
  console.log('dynamic form rendering completed, data exposed by dynamic form:', dynamicFormRef.value)
})

</script>

<style lang="scss" scoped>
@use "./index.scss" as *;
</style>