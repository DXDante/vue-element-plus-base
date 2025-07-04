<template>
  <el-form class="dynamic-form-wrap bs-b" ref="formRef" :model="formModelProps" v-bind="formProps" :class="formClass"
    :style="formStyle">
    <!-- TODO 1) 问题: 在 el-form 上派发事件 validate 事件目前会导致模板类型报错 [@validate="(...event) => $emit('validate', ...event)"] -->
    <!-- TODO 1) 解决: 这里不再转派发组件的事件, 直接在传递进组件的 formProps 中定义"on + 事件名称"即可, 忘记了源码中组件事件是在组件实例 vnode 虚拟节点上的 props 定义的 > _ < -->
    <el-form-item class="dynamic-form-item-wrap bs-b" ref="formItemsRef" v-for="(item, index) of filteredFields"
      :key="`form-item-${index}`" v-bind="item.formItemProps" :class="item.formItemClass" :style="item.formItemStyle">
      <!---------- form-item 动态插槽 ---------->
      <template v-for="(slotName) of item.formItemSlots ?? []"
        :key="`form-item-${item.formItemProps.prop || index}-${slotName}`" #[slotName]>
        <slot :name="`form-item-${item.formItemProps.prop || index}-${slotName}`"></slot>
      </template>
      <!---------- form-item 动态插槽 ---------->
      <template #default>
        <!-- @vue-ignore -->
        <!-- 非组合 - 动态表单组件 -->
        <dynamic-component ref="formComponentsRef" v-model="formModelProps[item.formItemProps.prop]"
          :form-item-prop="item.formItemProps.prop" :form-item-index="index" :is="item.is" :is-props="item.isProps"
          :is-slots="item.isSlots" :is-class="item.isClass" :is-style="item.isStyle" :is-subs="item.isSubs">
          <template v-for="(slotName) of item._isPenetrateSlots" :key="slotName" #[slotName]>
            <slot :name="slotName"></slot>
          </template>
        </dynamic-component>
        <!-- 组合 - 动态表单组件 -->
      </template>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { IDynamicFormProps, FilteredFormFields } from './index'
import { computed, ref, toRefs } from 'vue'
import DynamicComponent from './dynamic-component.vue'
// import { ElInput, ElSelectV2 } from 'element-plus'

/**
 * 动态表单 (根据配置字段生成表单内部各种表单组件, 高度灵活, 自由搭配)
 */

defineOptions({
  name: 'dynamic-form'
})
// TODO 1) 问题定义的事件类型 2 种方式
// defineEmits<{
//   // (event: 'validate', prop: ElementPlus.FormItemProp, isValid: boolean, message: string): void
//   // validate: [prop: ElementPlus.FormItemProp, isValid: boolean, message: string]
// }>()

// const componentMap = computed(() => ({
//   'el-input': ElInput,
//   'el-select-v2': ElSelectV2
// }))

const props = defineProps<IDynamicFormProps>()
const {
  formModelProps,
  formProps,
  formClass,
  formStyle,
  fields
} = toRefs(props)
// 已过滤的字段集 (主要处理生成透传到 dynamic-component 里动态生成的表单组件内部的插槽名称)
const filteredFields = computed<FilteredFormFields[]>(() => fields.value.map((item, index) => {
  const _isPenetrateSlots = Array.isArray(item.isSlots) ? item.isSlots.map(slotName => `${item.is}-${item.formItemProps.prop || index}-${slotName}`) : []
  item = { ...item, _isPenetrateSlots } as FilteredFormFields
  return item
}))

const formRef = ref<ElementPlus.FormInstance | null>(null)
const formItemsRef = ref<ElementPlus.FormItemInstance[] | null>(null)
// TODO: 组件实例暂时用 unknown 定义, 后续定义组件实例联合类型
const formComponentsRef = ref<unknown[] | null>(null)

defineExpose({
  formRef,
  formItemsRef,
  formComponentsRef
})
</script>

<style lang="scss" scoped></style>