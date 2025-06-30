<template>
  <div class="main-wrap bs-b p-r o-h">
    <!-- 内容区视图 -->
    <router-view v-slot="{ Component }">
      <shuttle>
        <component :is="Component" />
      </shuttle>
    </router-view>
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