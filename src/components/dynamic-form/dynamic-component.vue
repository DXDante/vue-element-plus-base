<template>
  <!-- @vue-ignore -->
  <component v-if="componentMap[is]" :is="componentMap[is]" ref="componentRef" :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)" v-bind="isProps" :class="isClass" :style="isStyle">
    <!---------- 动态组件 - 动态插槽 ---------->
    <template v-for="(slotName) of isSlots ?? []" :key="`${is}-${formItemProp || formItemIndex}-${slotName}`"
      #[slotName]>
      <slot :name="`${is}-${formItemProp || formItemIndex}-${slotName}`">
      </slot>
    </template>
    <!---------- 动态组件 - 动态插槽 ---------->
    <!---------- 动态组件 - 默认插槽 ---------->
    <template v-if="isSubs && isSubs.length" #default>
      <dynamic-component v-for="(item, index) of isSubs"
        :key="`${item.is}-${formItemProp || formItemIndex}-${index}-component`" :form-item-prop="formItemProp"
        :form-item-index="formItemIndex" v-bind="item">
      </dynamic-component>
    </template>
    <!---------- 动态组件 - 默认插槽 ---------->
  </component>
</template>

<script lang="ts" setup>
import type { IDynamicComponentProps } from './index'
import { computed, ref, toRefs } from 'vue'
import { ElInput, ElSelectV2, ElSelect, ElOptionGroup, ElOption } from 'element-plus'

defineOptions({
  name: 'dynamic-component'
})
const props = defineProps<IDynamicComponentProps>()
defineEmits<{
  (event: 'update:modelValue', data: unknown): void
}>()
const { modelValue, formItemProp, formItemIndex, is, isProps, isSlots, isClass, isStyle, isSubs } = toRefs(props)

const componentMap = computed(() => ({
  'el-input': ElInput,
  'el-select-v2': ElSelectV2,
  'el-select': ElSelect,
  'el-option-group': ElOptionGroup,
  'el-option': ElOption
}))

const componentRef = ref<unknown>(null)

defineExpose({
  componentRef
})
</script>

<style lang="scss" scoped></style>