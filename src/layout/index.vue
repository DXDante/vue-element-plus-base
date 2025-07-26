<template>
  <div class="layout-wrap bs-b d-f flex-ff-c flex-ai-s">
    <div class="layout-toolbar-wrap bs-b">
      <toolbar />
    </div>
    <div class="layout-body-wrap bs-b d-f flex-ai-s">
      <div class="layout-sidebar-wrap bs-b">
        <sidebar />
      </div>
      <div class="layout-content-wrap bs-b">
        <router-view v-slot="{ Component }">
          <!-- <shuttle></shuttle> -->
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
const Toolbar = defineAsyncComponent(() => import('./toolbar/index.vue'))
const Sidebar = defineAsyncComponent(() => import('./sidebar/index.vue'))

defineOptions({
  name: 'layout-index'
})
</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>