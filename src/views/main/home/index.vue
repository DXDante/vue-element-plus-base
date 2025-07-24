<template>
  <div class="home-wrap component-wrap pd d-f flex-ff-c flex-ai-c">
    <h3>首页</h3>
    <div class="brn-wrap bs-b mt-30">
      <el-button class="btn" type="primary" round @click.stop="toRoute('main-article')">文章(普通跳转)</el-button>
      <el-button v-if="userStoreUserInfo?.role === 0" class="btn" type="primary" round
        @click.stop="toRoute('main-action')">用户权限指定动态路由</el-button>
      <el-button class="btn" type="primary" round @click.stop="toRoute('main-dynamic-form-example')">动态表单示例</el-button>
      <el-button class="btn" type="primary" round
        @click.stop="toRoute('main-virtualized-table-official-example')">虚拟表格批量编辑示例(10W 数据, 函数式组件 + ref
        深度响应式)</el-button>
      <el-button class="btn" type="primary" round @click.stop="toBack">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'

defineOptions({
  name: 'main-home'
})

const router = useRouter()
const { userInfo: userStoreUserInfo } = storeToRefs(useUserStore())
const toRoute = (routeName: string) => {
  router.push({ name: routeName })
}
const toBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>