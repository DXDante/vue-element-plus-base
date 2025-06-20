<template>
  <div class="layout-wrap bs-b d-f flex-ff-c flex-ai-s">
    <!-- 其他布局板块 -->
    <Toolbar />
    <RouterView class="router-view" v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<script lang="ts" setup>
import Toolbar from 'views/toolbar/index.vue'

defineOptions({
  name: 'layout-index'
})
</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>