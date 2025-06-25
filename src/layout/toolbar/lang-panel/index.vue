<template>
  <div class="lang-panel-wrap bs-b d-f flex-ai-c">
    <el-select class="lang-select" :modelValue="langCurrentUse" size="small" placeholder="选择语言" :validate-event="false"
      placement="bottom" @change="onLangChange">
      <el-option v-for="item in langUseList" :key="item.value" :label="item.name" :value="item.value" />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import useElementConfig from 'config/element'

const { langUseList, langCurrentUse, switchLocaleConfig } = useElementConfig()

defineOptions({
  name: 'lang-panel'
})

const onLangChange = (value: string) => {
  switchLocaleConfig(value)
}

</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>