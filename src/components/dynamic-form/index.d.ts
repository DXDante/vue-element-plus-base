export type FormModelProps = ValueType<Pick<Mutate<ElementPlus.FormProps>, 'model'>, 'model'>

export type FormProps = Partial<Omit<Mutate<ElementPlus.FormProps>, 'rules' | 'model'>>

// type FormItemMutateProps = Mutate<ElementPlus.FormItemProps>
// export type FormItemProps = Computed<
//   Partial<Omit<FormItemMutateProps, 'prop'>> & Required<Pick<FormItemMutateProps, 'prop'>>
// >
export type FormItemProps = Partial<Mutate<ElementPlus.FormItemProps>>

/******************** 动态组件 props 类型 ********************/
export type FormAutocompleteProps = Mutate<ElementPlus.AutocompleteProps>
export type FormCascaderProps = typeof ElementPlus.cascaderProps
export type FormCheckboxGroupProps = Mutate<ElementPlus.CheckboxGroupProps>
export type FormCheckboxProps = ElementPlus.CheckboxProps
export type FormCheckboxButtonProps = ElementPlus.CheckboxProps
export type FormColorPickerProps = Mutate<ElementPlus.ColorPickerProps>
export type FormDatePickerProps = Mutate<ElementPlus.DatePickerProps>
export type FormDateTimePickerProps = Mutate<ElementPlus.DatePickerProps>
export type FormInputProps = Partial<Mutate<ElementPlus.InputProps>>
export type FormInputNumberProps = Mutate<ElementPlus.InputNumberProps>
export type FormInputTagProps = Mutate<ElementPlus.InputTagProps>
export type FormMentionProps = ElementPlus.MentionProps
export type FormRadioGroupProps = Mutate<ElementPlus.RadioGroupProps>
export type FormRadioProps = Mutate<ElementPlus.RadioProps>
export type FormRadioButtonProps = Mutate<ElementPlus.RadioButtonProps>
export type FormRateProps = Mutate<ElementPlus.RateProps>
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
export type FormSliderProps = Mutate<ElementPlus.SliderProps>
export type FormSwitchProps = Mutate<ElementPlus.SwitchProps>
export type FormTimePickerProps = Mutate<ElementPlus.TimePickerDefaultProps>
export type FormTimeSelectProps = Mutate<ElementPlus.TimeSelectProps>
export type FormTransferProps = Mutate<ElementPlus.TransferProps>
/****** TreeSelect 未添加类型 ******/
export type FormUploadProps = Mutate<ElementPlus.UploadProps>
/******************** 动态组件 props 类型 ********************/

export type FormIsProps =
  | FormAutocompleteProps
  | FormCascaderProps
  | FormCheckboxProps
  | FormCheckboxButtonProps
  | FormColorPickerProps
  | FormDatePickerProps
  | FormDateTimePickerProps
  | FormInputProps
  | FormInputNumberProps
  | FormInputTagProps
  | FormMentionProps
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

export type IsSubType = Omit<IDynamicComponentProps, 'modelValue'>

export type FilteredFields = IFormFields & {
  _isPenetrateSlots?: string[]
}

export type FormClass = string | string[] | Record<string, boolean>

export interface IDynamicComponentProps {
  modelValue?: unknown
  formItemProp?: ValueType<FormItemProps, 'prop'>
  formItemIndex?: number
  is: ValueType<Pick<IFormFields, 'is'>, 'is'>
  isProps?: FormIsProps
  isSlots?: string[]
  isClass?: FormClass
  isStyle?: Record<string, string>
  isSubs?: IsSubType[]
}

export interface IFormFields {
  formItemProps: FormItemProps
  formItemSlots?: string[]
  formItemClass?: FormClass
  formItemStyle?: Record<string, string>
  is: 'el-input' | 'el-select-v2' | 'el-select' | 'el-option-group' | 'el-option'
  isProps?: FormIsProps
  isSlots?: string[]
  isClass?: FormClass
  isStyle?: Record<string, string>
  isSubs?: IsSubType[]
  formItemSubs?: IFormFields[]
  // TODO:
  // formItemSubWrapEl?: string
  // formItemSubWrapElClass?: FormClass
  // formItemSubWrapElStyle?: Record<string, string>
  // formItemSubGapEl?: string
  // formItemSubGapElClass?: FormClass
  // formItemSubGapElStyle?: Record<string, string>
  // formItemSubGapElContent?: string
}

export interface IDynamicFormProps {
  formModelProps: FormModelProps
  formProps: FormProps
  formClass?: FormClass
  formStyle?: Record<string, string>
  fields: IFormFields[]
}
