<template>
  <div class="home-wrap component-wrap pd">
    <h3>首页</h3>
    <el-button type="primary" round @click.stop="toArticle">跳转文章</el-button>
  </div>
</template>

<script lang="ts" setup>
import 'element-plus/es/components/button/style/index'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'home-index'
})

const router = useRouter()
const toArticle = () => {
  router.replace({ name: 'main-article' })
}
</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>