<template>
  <el-config-provider :locale="localeConfig" :size="sizeConfig" :z-index="zIndexConfig" :button="buttonConfig"
    :link="linkConfig" :message="messageConfig">
    <div class="app-wrap bs-b">
      <Layout />
      <Loading />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useElementConfig from 'config/element'
import Layout from 'layout/index.vue'
import Loading from 'layout/loading/index.vue'

// If you need define component options, like this
defineOptions({
  name: 'app'
})

const {
  locale: localeConfig,
  size: sizeConfig,
  zIndex: zIndexConfig,
  button: buttonConfig,
  link: linkConfig,
  message: messageConfig
} = useElementConfig()

onMounted(() => {
})
</script>

<style scoped></style>
