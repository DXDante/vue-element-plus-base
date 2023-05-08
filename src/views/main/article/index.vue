<template>
  <div class="article-wrap component-wrap pd">
    <h3>文章</h3>
    <el-button type="primary" round @click.stop="toHome">跳转首页</el-button>
  </div>
</template>

<script lang="ts" setup>
import 'element-plus/es/components/button/style/index'
import { useRouter } from 'vue-router'

const router = useRouter()
const toHome = () => {
  router.replace({ name: 'main-home' })
}
</script>

<style lang="scss" scoped>
@import "./index";
</style>