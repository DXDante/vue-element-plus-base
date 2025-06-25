<template>
  <div class="main-wrap bs-b p-r o-h">
    <!-- 内容区视图 -->
    <RouterView v-slot="{ Component }">
      <transition name="router-view-slide-zoom" :class="[currentHistoryDirection]">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
defineOptions({
  name: 'main-index'
})

const router = useRouter()
// 过渡时间
const viewTransitionDuration = ref(160)
// 过渡主/次动画执行时间
const viewTransitionMainTime = computed(() => `${viewTransitionDuration.value}ms`)
const viewTransitionSecondaryTime = computed(() => `${viewTransitionDuration.value * 0.85}ms`)
const currentHistoryDirection = ref('forward')

// 监听历史记录是否是后退, 后退则启用后退过渡模式
router.options.history.listen(async (_to, _from, { direction }) => {
  currentHistoryDirection.value = direction
})

router.afterEach(async () => {
  // 操作返回按钮进入后退过渡完成后恢复前进模式
  if (currentHistoryDirection.value == 'back') {
    await new Promise(resolve => setTimeout(resolve, viewTransitionDuration.value))
    currentHistoryDirection.value = 'forward'
  }
})

</script>

<style lang="scss" scoped>
@use "./index" as *;

.router-view-slide-zoom-enter-from,
.router-view-slide-zoom-leave-to {
  position: absolute !important;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
}

.forward {
  &.router-view-slide-zoom-enter-from {
    transform: translateX(100px);
  }

  &.router-view-slide-zoom-enter-to {
    transform: translateX(0);
  }
}

.back {
  &.router-view-slide-zoom-leave-from {
    transform: translateX(0);
  }

  &.router-view-slide-zoom-leave-to {
    transform: translateX(100px);
  }

  &.router-view-slide-zoom-leave-active {
    z-index: 1;
  }
}

.router-view-slide-zoom-enter-to,
.router-view-slide-zoom-leave-from {
  opacity: 1;
}

.router-view-slide-zoom-enter-active,
.router-view-slide-zoom-leave-active {
  transition:
    transform v-bind(viewTransitionMainTime),
    opacity v-bind(viewTransitionSecondaryTime);
}
</style>