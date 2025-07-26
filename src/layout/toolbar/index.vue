<template>
  <div class="toolbar-wrap bs-b d-f flex-jc-sb flex-ai-c o-h" :class="{ expanded: userStoreIsLogged }">
    <div class="left bs-b d-f flex-ai-c"></div>
    <div class="center bs-b d-f flex-ai-c"></div>
    <div class="right bs-b d-f flex-ai-c">
      <lang-panel />
      <user-panel />
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserPanel from './user-panel/index.vue'
import LangPanel from './lang-panel/index.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user/index'
import { ref } from 'vue'

defineOptions({
  name: 'toolbar-index'
})

const { isLogged: userStoreIsLogged } = storeToRefs(useUserStore())
const barDefaultHeight = ref('0px')
const barExpandedHeight = ref('40px')
</script>

<style lang="scss" scoped>
@use "./index" as *;

.toolbar-wrap {
  height: v-bind(barDefaultHeight);

  &.expanded {
    height: v-bind(barExpandedHeight);
  }
}
</style>