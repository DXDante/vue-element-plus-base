import DynamicForm from './index.vue'

export type FormModelProps = ValueType<Pick<Mutate<ElementPlus.FormProps>, 'model'>, 'model'>

export type FormProps = Partial<Omit<Mutate<ElementPlus.FormProps>, 'rules' | 'model'>>

// type FormItemMutateProps = Mutate<ElementPlus.FormItemProps>
// export type FormItemProps = Computed<
//   Partial<Omit<FormItemMutateProps, 'prop'>> & Required<Pick<FormItemMutateProps, 'prop'>>
// >
export type FormItemProps = Partial<Mutate<ElementPlus.FormItemProps>>

/******************** 动态组件 props 类型 ********************/
export type FormAutocompleteProps = Partial<Mutate<ElementPlus.AutocompleteProps>>
export type FormCascaderProps = Partial<typeof ElementPlus.cascaderProps>
export type FormCheckboxGroupProps = Partial<Mutate<ElementPlus.CheckboxGroupProps>>
export type FormCheckboxProps = Partial<ElementPlus.CheckboxProps>
export type FormCheckboxButtonProps = Partial<ElementPlus.CheckboxProps>
export type FormColorPickerProps = Partial<Mutate<ElementPlus.ColorPickerProps>>
export type FormDatePickerProps = Partial<Mutate<ElementPlus.DatePickerProps>>
export type FormDateTimePickerProps = Partial<Mutate<ElementPlus.DatePickerProps>>
export type FormInputProps = Partial<Mutate<ElementPlus.InputProps>>
export type FormInputNumberProps = Partial<Mutate<ElementPlus.InputNumberProps>>
export type FormInputTagProps = Partial<Mutate<ElementPlus.InputTagProps>>
export type FormMentionProps = Partial<ElementPlus.MentionProps>
export type FormRadioGroupProps = Partial<Mutate<ElementPlus.RadioGroupProps>>
export type FormRadioProps = Partial<Mutate<ElementPlus.RadioProps>>
export type FormRadioButtonProps = Partial<Mutate<ElementPlus.RadioButtonProps>>
export type FormRateProps = Partial<Mutate<ElementPlus.RateProps>>
export type FormSelectProps = Partial<ElementPlus.SelectProps>
export type FormOptionGroupProps = {
  label?: string
  disabled?: boolean
}
/***** 重定义 Element Plus Select 的 Option 组件 Props *****/
type IfUnknown<T, Y, N> = [unknown] extends [T] ? Y : N
type UnknownToNever<T> = IfUnknown<T, never, T>
type IfNever<T, Y = true, N = false> = [T] extends [never] ? Y : N
type Value<T> = T[keyof T]
type ExtractPropType<T extends object> = Value<
  Vue.ExtractPropTypes<{
    key: T
  }>
>
type Writable<T> = {
  -readonly [P in keyof T]: T[P]
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WritableArray<T> = T extends readonly any[] ? Writable<T> : T
type ResolvePropType<T> = IfNever<
  T,
  never,
  ExtractPropType<{
    type: WritableArray<T>
    required: true
  }>
>
type EpPropMergeType<Type, Value, Validator> =
  | IfNever<UnknownToNever<Value>, ResolvePropType<Type>, never>
  | UnknownToNever<Value>
  | UnknownToNever<Validator>
type OptionProps = Vue.ExtractPropTypes<{
  value: {
    readonly type: Vue.PropType<
      EpPropMergeType<
        (ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[],
        unknown,
        unknown
      >
    >
    readonly required: true
    readonly validator: ((val: unknown) => boolean) | undefined
    __epPropKey: true
  }
  label: {
    readonly type: Vue.PropType<
      EpPropMergeType<(NumberConstructor | StringConstructor)[], unknown, unknown>
    >
    readonly required: false
    readonly validator: ((val: unknown) => boolean) | undefined
    __epPropKey: true
  }
  created: BooleanConstructor
  disabled: BooleanConstructor
}>
export type FormOptionProps = Partial<OptionProps>
/***** 重定义 Element Plus Select 的 Option 组件 Props *****/
export type FormSelectV2Props = Partial<Mutate<ElementPlus.SelectV2Props>>
export type FormSliderProps = Partial<Mutate<ElementPlus.SliderProps>>
export type FormSwitchProps = Partial<Mutate<ElementPlus.SwitchProps>>
export type FormTimePickerProps = Partial<Mutate<ElementPlus.TimePickerDefaultProps>>
export type FormTimeSelectProps = Partial<Mutate<ElementPlus.TimeSelectProps>>
export type FormTransferProps = Partial<Mutate<ElementPlus.TransferProps>>
export type FormTreeSelectProps = Computed<
  Partial<ElementPlus.TreeComponentProps> & FormSelectProps
>
export type FormUploadProps = Partial<Mutate<ElementPlus.UploadProps>>
export type FormButtonGroupProps = Partial<Mutate<Pick<ElementPlus.ButtonProps, 'size' | 'type'>>>
export type FormButtonProps = Partial<Mutate<ElementPlus.ButtonProps>>
/******************** 动态组件 props 类型 ********************/

export type FormIsProps =
  | FormAutocompleteProps
  | FormCascaderProps
  | FormCheckboxGroupProps
  | FormCheckboxProps
  | FormCheckboxButtonProps
  | FormColorPickerProps
  | FormDatePickerProps
  | FormDateTimePickerProps
  | FormInputProps
  | FormInputNumberProps
  | FormInputTagProps
  | FormMentionProps
  | FormRadioGroupProps
  | FormRadioProps
  | FormRadioButtonProps
  | FormRateProps
  | FormSelectProps
  | FormOptionGroupProps
  | FormOptionProps
  | FormSelectV2Props
  | FormSliderProps
  | FormSwitchProps
  | FormTimePickerProps
  | FormTimeSelectProps
  | FormTransferProps
  | FormTreeSelectProps
  | FormUploadProps
  | FormButtonGroupProps
  | FormButtonProps

export type FormIsType =
  | 'el-autocomplete'
  | 'el-cascader'
  | 'el-checkbox-group'
  | 'el-checkbox'
  | 'el-checkbox-button'
  | 'el-color-picker'
  | 'el-date-picker'
  | 'el-input'
  | 'el-input-number'
  | 'el-input-tag'
  | 'el-mention'
  | 'el-radio-group'
  | 'el-radio'
  | 'el-radio-button'
  | 'el-rate'
  | 'el-select'
  | 'el-option-group'
  | 'el-option'
  | 'el-select-v2'
  | 'el-slider'
  | 'el-switch'
  | 'el-time-picker'
  | 'el-time-select'
  | 'el-transfer'
  | 'el-tree-select'
  | 'el-upload'
  | 'el-button-group'
  | 'el-button'

export type IsSubType = Omit<IDynamicComponentProps, 'modelValue' | 'isSlots'>

export type FilteredFormFields = IFormFields & {
  _isPenetrateSlots?: string[]
}

export type FormClassType = string | string[] | Record<string, boolean>

export interface IDynamicComponentProps {
  modelValue?: unknown
  formItemProp?: ValueType<FormItemProps, 'prop'>
  formItemIndex?: number
  is: FormIsType
  isProps?: FormIsProps
  isSlots?: string[]
  isClass?: FormClassType
  isStyle?: Record<string, string>
  isSubs?: IsSubType[]
}

export interface IFormFields {
  formItemProps: FormItemProps
  formItemSlots?: string[]
  formItemClass?: FormClassType
  formItemStyle?: Record<string, string>
  is?: FormIsType
  isProps?: FormIsProps
  isSlots?: string[]
  isClass?: FormClassType
  isStyle?: Record<string, string>
  isSubs?: IsSubType[]
  formItemSubs?: IFormFields[]
  // TODO:
  // formItemSubWrapEl?: string
  // formItemSubWrapElClass?: FormClassType
  // formItemSubWrapElStyle?: Record<string, string>
  // formItemSubGapEl?: string
  // formItemSubGapElClass?: FormClassType
  // formItemSubGapElStyle?: Record<string, string>
  // formItemSubGapElContent?: string
}

export interface IDynamicFormProps {
  formModelProps: FormModelProps
  formProps: FormProps
  formClass?: FormClassType
  formStyle?: Record<string, string>
  fields: IFormFields[]
}

export type DynamicFormInstance = InstanceType<typeof DynamicForm>
