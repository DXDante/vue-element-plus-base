<template>
  <el-form class="dynamic-form-wrap bs-b" ref="formRef" :model="formModelProps" v-bind="formProps" :class="formClass"
    :style="formStyle">
    <el-form-item class="dynamic-form-item-wrap bs-b" ref="formItemsRef" v-for="(item, index) of filteredFields"
      :key="`form-item-${index}`" v-bind="item.formItemProps" :class="item.formItemClass" :style="item.formItemStyle">
      <!-- -------- form-item 动态插槽 -------- -->
      <template v-for="(slotName) of item.formItemSlots ?? []"
        :key="`el-form-item-${item.formItemProps.prop || index}-${slotName}`" #[slotName]="formItemScope">
        <slot :name="`el-form-item-${item.formItemProps.prop || index}-${slotName}`" v-bind="formItemScope"></slot>
      </template>
      <!-- -------- form-item 动态插槽 -------- -->
      <template #default>
        <!-- @vue-ignore -->
        <dynamic-component v-if="item.is" ref="formComponentsRef" v-model="formModelProps[item.formItemProps.prop]"
          :form-item-prop="item.formItemProps.prop" :form-item-index="index" :is="item.is" :is-props="item.isProps"
          :is-slots="item.isSlots" :is-class="item.isClass" :is-style="item.isStyle" :is-subs="item.isSubs">
          <template v-for="(slotName) of item._isPenetrateSlots" :key="slotName" #[slotName]="dynamicTransScope">
            <slot :name="slotName" v-bind="dynamicTransScope"></slot>
          </template>
        </dynamic-component>
      </template>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { IDynamicFormProps, FilteredFormFields, DynamicFormComponentsInstance } from './index'
import { computed, ref, toRefs } from 'vue'
import DynamicComponent from './dynamic-component.vue'

/**
 * 动态表单 (根据配置字段生成表单内部各种表单组件, 高度灵活, 自由搭配)
 * @property { FormModelProps } formModelProps                    el-form 组件中剔出的 model 数据对象
 * @property { FormProps } formProps                              el-form 组件中剔除 model 属性剩余的所有属性选项集
 * @property { FormClassType } formClass?                         el-form 组件自定义 class 集 (可选)
 * @property { Record<string, string> } formStyle?                el-form 组件自定义 style 集 (可选)
 * @property { IFormFields[] } fields                             动态表单配置数据字段集
 * 
 * fields 字段定义属性
 * @property { FormItemProps } formItemProps                      el-form-item 组件中所有 props 选项集
 * @property { string[] } formItemSlots?                          el-form-item 组件中所有插槽名称集 (定义插槽名称, 就可在模板中访问对应插槽
 *                                                                例如: ['default'], 模板中定义 #el-form-item-dateAndTime-default, 由三部分组成, el-form-item 表示使用的组件, dateAndTime 表示表单数据字段, default 表示插槽名称, 同样支持作用域插槽)
 * @property { FormClassType } formItemClass?                     el-form-item 组件自定义 class 集 (可选)
 * @property { Record<string, string> } formItemStyle?            el-form-item 组件自定义 style 集 (可选)
 * @property { FormIsType } is?                                   动态创建的表单组件名称, 例如: el-select、el-cascader
 * @property { FormIsProps } isProps?                             动态创建的表单组件所有属性选项
 * @property { string[] } isSlots?                                动态创建的表单组件所有的插槽集 (用法与命名规则同 formItemSlots 一致)
 * @property { FormClassType } isClass?                           动态创建的表单自定义 class 集 (可选)
 * @property { Record<string, string> } isStyle?                  动态创建的表单自定义 style 集 (可选)
 * @property { IsSubType[] } isSubs?                              动态创建的表单下的动态辅助表单组件 (可选), 例如: el-select 下的, el-option / el-option-group
 * 
 * isSubs 字段定义属性
 * @property { unknown } modelValue?                              无需关心, 只在该组件 el-form-item 下的动态组件自动绑定, 在 isSubs 下数据定义并没有该字段
 * @property { ValueType<FormItemProps, 'prop'> } formItemProp?   无需关心, fields 字段下 formItemProps 定义的 prop 数据, 会在该组件内部自动传递
 * @property { number } formItemIndex?                            无需关心, fields 字段下循环 el-form-item 的索引, 会在该组件内部自动传递
 * @property { FormIsType } is                                    动态创建的表单下的动态辅助表单组件名称
 * @property { FormIsProps } isProps?                             动态创建的表单下的动态辅助表单组件所有属性选项
 * @property { string[] } isSlots?                                动态创建的表单下的动态辅助表单组件所有插槽集 (用法与命名规则同 formItemSlots 一致)
 * @property { FormClassType } isClass?                           动态创建的表单下的动态辅助表单组件自定义 class 集 (可选)
 * @property { Record<string, string> } isStyle?                  动态创建的表单下的动态辅助表单组件自定义 style 集 (可选)
 * @property { IsSubType[] } isSubs?                              递归的辅助表单组件 (例如有多层的表单组件, el-select -> el-option-group -> el-option)
 * 
 * @example
 * template:
 * <dynamic-form :form-model-props="formModelProps" :form-props="formProps" :fields="formFields">
 *   <template #el-input-name-suffix>                                                    // 插槽由三部分组成 el-xxx ElementPlus 组件名, name 表单数据项, suffix ElementPlus 组件插槽名
 *     <el-icon class="el-input__icon" color="#ea5413" size="13">
 *       <User />
 *     </el-icon>
 *   </template>
 * </dynamic-form>
 * 
 * 
 * data logic:
 * const formModelProps = reactive<DynamicFormRule>({ name: '', region: '' })
 * const formProps = computed<FormProps>(() => ({ labelWidth: 'auto', rules: [ 自定义全局验证规则 ] }))
 * const formFields = computed<IFormFields[]>(() => [
 *   {
 *     formItemProps: { label: '姓名', prop: 'name', rules: [ 自定义验证规则 ] },           // el-form-item 所有 props 选项
 *     is: 'el-input',                                                                   // el-form-item 下使用的"动态表单组件"名
 *     isProps: { placeholder: '请输入姓名' },                                             // el-form-item 下使用的"动态表单组件"所有 props 选项
 *     isSlots: ['suffix']                                                               // el-form-item 下使用的"动态表单组件"所有 slots 选项
 *   },
 *   {
 *     formItemProps: { label: '地区', prop: 'region', rules: [ 自定义验证规则 ] },
 *     is: 'el-select',
 *     isProps: { placeholder: '请选择地区', noDataText: '喔豁, 没得数据' },
 *     isSlots: ['footer'],
 *     isSubs: [                                                                         // 动态表单组件下辅助组件, 递归的声明
 *       {
 *         is: 'el-option-group',
 *         isProps: { label: '成都市' },
 *         isSubs: [
 *           { is: 'el-option', isProps: { label: '武侯区', value: '1-1' } },
 *           { is: 'el-option', isProps: { label: '锦江区', value: '1-2' } }
 *         ]
 *       }
 *       .....
 *     ]
 *   },
 *   // 如果需要在 el-form-item 下自定义层级结构/布局等, 就只需要简单定义数据, 在模板下自定义即可
 *   // 最好是指定 formItemProps 下 prop 字段, 访问插槽时更明确, 否则插槽生成将会使用 formFields 的索引, 万一表单项的顺序被打乱则不会成功渲染
 *   {
 *     formItemProps: { label: '多个表单组件定义为一项', prop: 'custom-arbitrary-key', required: true },
 *     formItemSlots: ['default']
 *   }
 *   .....
 * ])
 */

defineOptions({
  name: 'dynamic-form'
})

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
const formComponentsRef = ref<DynamicFormComponentsInstance[] | null>(null)

defineExpose({
  formRef,
  formItemsRef,
  formComponentsRef
})
</script>

<style lang="scss" scoped></style>