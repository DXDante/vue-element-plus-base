<template>
  <div class="example-virtualized-table-official-wrap component-wrap pd d-f flex-ff-c flex-ai-s">
    <h3 class="title bs-b ta-c">Element 虚拟表格组件(官方)批量处理数据示例</h3>
    <div class="action-wrap bs-b d-f flex-jc-c flex-ai-c">
      <el-input class="edit-ipt" v-model="textRef" v-bind="textPropConfigs" />
      <el-button class="btn" type="primary" round @click.stop="batchUpdateData()">批量操作数据</el-button>
    </div>
    <div class="table-wrap bs-b">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2 class="table" ref="tableRef" :cache="2" :columns="columns" :data="dataRef" :width="width"
            :height="height" fixed />
        </template>
      </el-auto-resizer>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import type { InputCellProps, CheckboxCellProps } from './index'
import { computed, onMounted, readonly, ref, toRaw, withKeys } from 'vue'
import { ElInput, ElCheckbox, ElMessage } from 'element-plus'

defineOptions({
  name: 'test-table'
})

const generateColumns = (length = 10, prefix = 'column-', props?: any) => {
  return Array.from({ length }).map((_, columnIndex, resource) => {
    const isStart = columnIndex == 0
    const isEnd = columnIndex == resource.length - 1

    return {
      ...props,
      key: `${prefix}${columnIndex}`,
      dataKey: `${prefix}${columnIndex}`,
      title: isStart || isEnd ? `固定列 ${columnIndex}` : `列 ${columnIndex}`,
      width: 150,
      fixed: isStart ? 'left' : isEnd ? 'right' : false
    }
  })
}

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = 'row-'
) => {
  return Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        editing: false,
        checked: false,
        parentId: null
      }
    )
  })
}

// 表格 - 编辑项
const InputCell: Vue.FunctionalComponent<InputCellProps> = ({
  value,
  onChange,
  onBlur,
  onKeydownEnter,
  forwardRef,
}) => {
  return (
    <ElInput
      ref={forwardRef as any}
      onInput={onChange}
      onBlur={onBlur}
      onKeydown={withKeys(onKeydownEnter, ['enter'])}
      modelValue={value}
    />
  )
}

const onRowEnterEditMode = ({ rowData }: any) => {
  // , column
  rowData.editing = true
}

const onRowExitEditMode = ({ rowData }: any) => {
  // , column
  rowData.editing = false
}

const onRowInputChange = ({ rowData, column }: any, value: string) => {
  rowData[column.dataKey!] = value
}

const columns: ElementPlus.Column<unknown>[] = generateColumns(10, 'column-', {
  align: 'center'
})

// 重置 - 编辑列
columns[0] = {
  ...columns[0],
  title: '固定列头(可编辑)',
  cellRenderer: ({ rowData, column, ...others }) => {
    // console.log('编辑 - 单元格 cellRenderer')

    if (rowData.editing) {
      // const input = ref<ElementPlus.InputInstance | null>(null)
      const setRef = (el: ElementPlus.InputInstance) => {
        console.log('调用 setRef:', el)
        // input.value = el
        if (el) {
          el.focus?.()
        }
      }

      return (
        <InputCell
          forwardRef={setRef}
          value={rowData[column.dataKey!]}
          onChange={(...rest) => onRowInputChange({ rowData, column, ...others }, ...rest)}
          onBlur={() => onRowExitEditMode({ rowData, column, ...others })}
          onKeydownEnter={() => onRowExitEditMode({ rowData, column, ...others })}
        />
      )
    }

    return (
      <div class="table-v2-inline-editing-trigger not-select" onDblclick={() => onRowEnterEditMode({ rowData, column, ...others })} >
        {rowData[column.dataKey!]}
      </div>
    )
  }
}

// 表格 - 选择项
const CheckboxCell: Vue.FunctionalComponent<CheckboxCellProps> = ({
  value,
  intermediate = false,
  onChange
}) => {
  return (
    <ElCheckbox
      onChange={onChange}
      modelValue={value}
      indeterminate={intermediate}
    />
  )
}

const onRowCheckboxChange = ({ rowData }: any, value: ElementPlus.CheckboxValueType) => {
  // , column
  rowData.checked = value
}

const onRowCheckboxAllChange = async (value: ElementPlus.CheckboxValueType) => {
  console.time('###')
  dataRef.value = toRaw(dataRef.value).map((row) => {
    row.checked = value
    return row
  })
  console.timeEnd('###')
}

// 头部追加 - 选择列
columns.unshift({
  key: 'selection',
  width: 36,
  fixed: 'left' as ElementPlus.TableV2FixedDir,
  align: 'center',
  cellRenderer: ({ rowData, column, ...others }) => {
    // console.log('选择 - 单元格 cellRenderer')
    return (
      <CheckboxCell
        value={rowData.checked}
        onChange={(value) => onRowCheckboxChange({ rowData, column, ...others }, value)}
      />
    )
  },
  headerCellRenderer: () => {
    // console.log('全选 - 单元格 headerCellRenderer')
    return (
      <CheckboxCell
        value={dataAllSelected.value}
        intermediate={dataHalfSelected.value && !dataAllSelected.value}
        onChange={onRowCheckboxAllChange}
      />
    )
  }
})

const tableRef = ref<ElementPlus.TableInstance | null>(null)
const textRef = ref<string>('')
const textPropConfigs = readonly<Record<string, unknown>>({
  placeholder: '请输入批量编辑内容',
  maxlength: '15',
  clearable: true
})
const dataRef = ref(generateData(columns, 100000))
const dataAllSelected = computed(() => dataRef.value.every(row => row.checked))
const dataHalfSelected = computed(() => dataRef.value.some(row => row.checked))

// 批量更新选择数据的指定字段
const batchUpdateData = async (keys: string[] = ['column-0', 'column-1', 'column-2', 'column-3', 'column-4']) => {
  if (!dataHalfSelected.value) {
    return ElMessage.error({ message: '请选择要批量修改的数据' })
  }
  if (!textRef.value) {
    return ElMessage.error({ message: '请输入要批量编辑的内容' })
  }

  console.time('###')
  const newValue = textRef.value
  // 1) 响应式数据直接循环更改选中数据的属性(如果你明白 Vue 响应式原理就知道为什么) - 10W 条数据 280ms
  // 2) 循环原始数据最快(不涉及到代理属性被访问时调用大量函数) - 10W 条数据 10 ~ 14ms
  //    同样创建的新数组, map 循环创建的 item 生成的数据 比 初始化数组空间数据, 然后再挨个插入新数据更快
  //    不能直接修源数据再赋值到响应式数据替换(会报错), 通过 map 完全新建数据并返回新数组赋值最快
  const newData = toRaw(dataRef.value).map(item => {
    const newItem = { ...item }
    if (newItem.checked) {
      for (let i = 0; i < keys.length; i++) {
        newItem[keys[i]] = newValue
      }
    }
    return newItem
  })

  dataRef.value = newData as unknown[]
  console.timeEnd('###')
}

onMounted(() => {
  console.log('element-plus table instance:', tableRef.value)
})
</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>