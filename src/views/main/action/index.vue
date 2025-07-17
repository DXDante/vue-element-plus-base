<template>
  <div class="home-wrap component-wrap pd d-f flex-ff-c flex-ai-c">
    <h3>根据用户权限指定增加的动态路由页面</h3>
    <div class="brn-wrap bs-b mt-30">
      <el-button class="btn" type="primary" round @click.stop="router.back()">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

defineOptions({
  name: 'main-action'
})

const router = useRouter()
</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>