<template>
  <!-- @vue-ignore -->
  <!-- 非组合 - 动态表单组件 -->
  <component v-if="componentMap[item.is]" :is="componentMap[item.is]" ref="formComponentsRef"
    :key="`${item.is}-${item.formItemProps.prop || index}-component`" v-model="formModelProps[item.formItemProps.prop]"
    v-bind="item.isProps" :class="item.isClass" :style="item.isStyle">
    <!---------- 动态组件 - 动态插槽 ---------->
    <template v-for="(slotName) of item.isSlots ?? []"
      :key="`${item.is}-${item.formItemProps.prop || index}-${slotName}`" #[slotName]>
      <slot :name="`${item.is}-${item.formItemProps.prop || index}-${slotName}`">
      </slot>
    </template>
    <!---------- 动态组件 - 动态插槽 ---------->
  </component>
  <!-- 组合 - 动态表单组件 -->
</template>
