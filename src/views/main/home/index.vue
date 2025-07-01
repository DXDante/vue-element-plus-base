<template>
  <div class="home-wrap component-wrap pd d-f flex-ff-c flex-ai-c">
    <h3>首页</h3>
    <el-button class="btn" style="margin-top: 50px;" type="primary" round @click.stop="toArticle">跳转文章</el-button>
    <div></div>
    <el-button type="primary" style="margin-top: 50px;" round @click.stop="toBack">返回</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

defineOptions({
  name: 'main-home'
})

const router = useRouter()
const toArticle = () => {
  router.push({ name: 'main-article' })
}
const toBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>