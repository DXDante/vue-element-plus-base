<template>
  <div class="home-wrap component-wrap pd d-f flex-ff-c flex-ai-c">
    <h3>首页</h3>
    <div class="brn-wrap bs-b mt-30">
      <el-button class="btn" type="primary" round @click.stop="toArticle">跳转文章</el-button>
      <el-button class="btn" type="primary" round @click.stop="toDynamicFormExample">跳转动态表单测试</el-button>
      <el-button class="btn" type="primary" round @click.stop="toBack">返回</el-button>
    </div>
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
const toDynamicFormExample = () => {
  router.push({ name: 'main-dynamic-form-example' })
}
const toBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>