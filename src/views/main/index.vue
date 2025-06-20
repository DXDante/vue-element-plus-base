<template>
  <div class="main-wrap component-wrap bs-b d-f flex-ff-c flex-ai-s">
    <!-- 内容区视图 -->
    <RouterView class="router-view" v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'main-index'
})
</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>