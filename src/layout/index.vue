<template>
  <div class="layout-wrap bs-b d-f flex-ff-c flex-ai-s">
    <!-- 你也可以在这里添加其他的布局板块 -->
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
</script>

<style lang="scss" scoped>
@import "./index";
</style>