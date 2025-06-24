<template>
  <el-config-provider v-bind="elementConfig">
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

const { options: elementConfig } = useElementConfig()

onMounted(() => {
})
</script>

<style scoped></style>
