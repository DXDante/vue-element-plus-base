<template>
  <el-config-provider :locale="elementConfig.locale" :z-index="elementConfig.zIndex">
    <div class="app-wrap bs-b">
      <Layout />
      <Loading />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { elementConfigProviderOptions as elementConfig } from 'config'
import Layout from 'layout/index.vue'
import Loading from 'layout/loading/index.vue'

// If you need define component options, like this
defineOptions({
  name: 'app'
})

onMounted(() => {
})
</script>

<style scoped></style>
