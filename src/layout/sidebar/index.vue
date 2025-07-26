<template>
  <div class="sidebar-wrap bs-b" v-if="userStoreIsLogged">
    <!-- @select="onMenuSelect" -->
    <el-menu class="side-menu oy-a scroll" :default-active="menuActive" v-bind="menuConfigProps">
      <el-menu-item class="side-menu-item" v-for="item of menus" :key="item.id" :index="item.path">
        <div class="menu-name bs-b d-b">{{ item.name }}</div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute/*, useRouter*/ } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'

defineOptions({
  name: 'sidebar-index'
})

const route = useRoute()
// const router = useRouter()
const { isLogged: userStoreIsLogged, userInfo: userStoreUserInfo } = storeToRefs(useUserStore())
const menuActive = computed(() => route.path)
const menuConfigProps = computed(() => ({
  uniqueOpened: true,
  router: true,
  showTimeout: 150,
  hideTimeout: 150
}))
const menus = computed(() => {
  const bases = [
    { name: '首页(基础动态路由)', path: '/main/home' },
    { name: '文章(基础动态路由)', path: '/main/article' },
    // { name: '动作(权限动态路由)', path: '/main/action' },
    { name: '动态表单示例', path: '/main/dynamic-form-example' },
    { name: '虚拟表格批量编辑示例(10W 数据)', path: '/main/virtualized-table-official-example' }
  ]

  // 追加权限动态路由菜单
  if (userStoreUserInfo.value?.role === 0) {
    bases.splice(2, 0, { name: '动作(权限动态路由)', path: '/main/action' })
  }

  return bases.map((item, index) => Object.assign(item, { id: `menu-${index.toString()}` }))
})

// const onMenuSelect = (path: string) => {
//   if (path === menuActive.value) { return }

//   router.replace({ path })
// }

</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>