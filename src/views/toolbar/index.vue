<template>
  <div class="toolbar-wrap bs-b d-f flex-jc-sb flex-ai-c o-h" :class="{ expanded: userStoreIsLogged }">
    <div class="left bs-b d-f flex-ai-c"></div>
    <div class="center bs-b d-f flex-ai-c"></div>
    <div class="right bs-b d-f flex-ai-c">
      <UserPanel />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user/index'
import UserPanel from './components/user-panel/index.vue'

const { isLogged: userStoreIsLogged } = storeToRefs(useUserStore())
</script>

<style lang="scss" scoped>
@import "./index";
</style>