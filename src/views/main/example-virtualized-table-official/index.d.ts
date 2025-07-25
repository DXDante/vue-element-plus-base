export type InputCellProps = {
  value: string
  intermediate?: boolean
  onChange: (value: string) => void
  onBlur: () => void
  onKeydownEnter: () => void
  forwardRef: (el: ElementPlus.InputInstance) => void
}

export type CheckboxCellProps = {
  value: boolean
  intermediate?: boolean
  onChange: (value: CheckboxValueType) => void
}

export type InputHandlersType = {
  onRowEnterEditMode: () => void
  onRowExitEditMode: () => void
  onRowInputChange: (value: string) => void
}

export type CheckboxHandlersType = {
  onRowCheckboxChange: (value: ElementPlus.CheckboxValueType) => void
}
