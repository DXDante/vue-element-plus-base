<template>
  <div class="main-wrap component-wrap">
    <!-- 内容区视图 -->
    <RouterView class="router-view" v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
@import "./index";
</style>