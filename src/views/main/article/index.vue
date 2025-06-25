<template>
  <div class="article-wrap component-wrap pd">
    <h3>文章</h3>
    <el-button type="primary" round @click.stop="toHome">跳转首页</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

defineOptions({
  name: 'main-artical'
})

const router = useRouter()
const toHome = () => {
  router.push({ name: 'main-home' })
}
</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>