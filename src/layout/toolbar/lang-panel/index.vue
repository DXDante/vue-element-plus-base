<template>
  <div class="lang-panel-wrap bs-b d-f flex-ai-c">
    <el-select class="lang-select" ref="langSelectRef" :modelValue="langCurrentUse" size="small" placeholder="选择语言"
      :validate-event="false" placement="bottom" @change="onLangChange">
      <el-option v-for="item in langUseNames" :key="item.value" :label="item.name" :value="item.value" />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import useElementConfig from 'config/element'

const { langUseNames, langCurrentUse, switchLocaleConfig } = useElementConfig()

defineOptions({
  name: 'lang-panel'
})
const langSelectRef = ref(null)
const onLangChange = (value) => {
  switchLocaleConfig(value)
}

</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>