import type { Component } from 'vue'
import { markRaw } from 'vue'
import { ElInput, ElSelectV2, ElSelect, ElOptionGroup, ElOption } from 'element-plus'

export const dynamicFormComponent: Record<string, Component> = markRaw({
  'el-input': ElInput,
  'el-select-v2': ElSelectV2,
  'el-select': ElSelect,
  'el-option-group': ElOptionGroup,
  'el-option': ElOption
})
