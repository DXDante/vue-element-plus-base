<template>
  <!-- @vue-ignore -->
  <component v-if="dynamicFormComponent[is]" :is="dynamicFormComponent[is]" ref="componentRef" :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)" v-bind="isProps" :class="isClass" :style="isStyle">
    <!-- -------- 动态组件 - 动态插槽 -------- -->
    <template v-for="(slotName) of isSlots ?? []" :key="`${is}-${formItemProp || formItemIndex}-${slotName}`"
      #[slotName]>
      <slot :name="`${is}-${formItemProp || formItemIndex}-${slotName}`">
      </slot>
    </template>
    <!-- -------- 动态组件 - 动态插槽 -------- -->
    <!-- -------- 动态组件 - 默认插槽 -------- -->
    <template v-if="isSubs && isSubs.length" #default>
      <dynamic-component v-for="(item, index) of isSubs"
        :key="`${item.is}-${formItemProp || formItemIndex}-${index}-component`" :form-item-prop="formItemProp"
        :form-item-index="formItemIndex" v-bind="item">
      </dynamic-component>
    </template>
    <!-- -------- 动态组件 - 默认插槽 -------- -->
  </component>
</template>

<script lang="ts" setup>
import type { IDynamicComponentProps } from './index'
import { ref, toRefs } from 'vue'
import { dynamicFormComponent } from './dynamic-component-map'

defineOptions({
  name: 'dynamic-component'
})

defineEmits<{
  (event: 'update:modelValue', data: unknown): void
}>()

const props = defineProps<IDynamicComponentProps>()

const { modelValue, formItemProp, formItemIndex, is, isProps, isSlots, isClass, isStyle, isSubs } = toRefs(props)

const componentRef = ref<unknown>(null)

defineExpose({
  componentRef
})
</script>

<style lang="scss" scoped></style>