<template>
  <div class="layout-wrap">
    <!-- 你也可以在这里添加其他的布局板块 -->
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