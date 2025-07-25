<template>
  <transition :name="nameValue" :class="classValue" :enter-from-class="enterFromClass"
    :enter-active-class="enterActiveClass" :enter-to-class="enterToClass" :leave-from-class="leaveFromClass"
    :leave-active-class="leaveActiveClass" :leave-to-class="leaveToClass">
    <slot></slot>
  </transition>
</template>

<script lang="ts" setup>
import type { IShuttleProps } from './index'
import { computed, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

/**
 * 穿梭 - 专门针对于定义路由组件转场动画特效
 * @property mode                 转场动画模式, 内置两种(默认值: 'slide', 'slide'、'slide-zoom')
 * @property duration             持续时间(默认值: 160, 单位 ms, 这个值主要作用是后退效果完成后, 恢复前进的默认 class 标识, 也就是转场动画执行方向的标识, 不是控制过渡动效的时间, 动效时间是你自己 css 的时间)
 * @property slideSize            滑动距离, 内置转场动画页面组件滑动的距离(默认值: 80, 单位 px)
 * @property zoomSize             缩放尺寸, 内置转场动画页面组件缩放的尺寸(默认值: 0.96)
 * @property transitionClass      自定义的过渡类名集(默认值: undefined, Vue 内置 Transition 组件定义的过渡 class 类名)
 *           {
 *              enterFromClass,
 *              enterActiveClass,
 *              enterToClass,
 *              leaveFromClass,
 *              leaveActiveClass,
 *              leaveToClass
 *           }
 */
defineOptions({
  name: 'shuttle-index'
})

const defaultSlideSize = 100
const defaultZoomSize = 0.96

// 为了兼容 3.4 及以下版本, 采用编译器宏来设置默认值(3.4 以下必须导入使用)
const props = withDefaults(defineProps<IShuttleProps>(), {
  mode: 'slide',
  duration: 180,
  slideSize: defaultSlideSize,
  zoomSize: defaultZoomSize
})
const {
  mode,
  duration,
  slideSize,
  zoomSize,
  transitionClass
} = toRefs(props)

// 过渡方向 (forward 前进/ back 后退)
const direction = ref('forward')
const nameValue = computed(() => transitionClass.value ? '' : mode.value)
const classValue = computed(() => [direction.value])
// 自定义过渡类名
const enterFromClass = computed(() => transitionClass.value?.enterFromClass)
const enterActiveClass = computed(() => transitionClass.value?.enterActiveClass)
const enterToClass = computed(() => transitionClass.value?.enterToClass)
const leaveFromClass = computed(() => transitionClass.value?.leaveFromClass)
const leaveActiveClass = computed(() => transitionClass.value?.leaveActiveClass)
const leaveToClass = computed(() => transitionClass.value?.leaveToClass)
// 滑动距离
const slideDistance = computed(() => `${slideSize.value < 0 ? defaultSlideSize : slideSize.value}px`)
// 缩放大小
const zoomRatio = computed(() => (zoomSize.value < 0 || zoomSize.value > 1 ? defaultZoomSize : zoomSize.value))
// 过渡主/次动画执行时间
const mainTime = computed(() => `${duration.value}ms`)
const secondaryTime = computed(() => `${duration.value * 0.85}ms`)

const router = useRouter()

// 监听历史记录是否是后退, 后退则启用后退过渡模式
router.options.history.listen(async (_to, _from, { direction: currentDirection }) => {
  direction.value = currentDirection
})

router.afterEach(async () => {
  // 操作返回按钮进入后退过渡完成后恢复前进模式
  if (direction.value == 'back') {
    await new Promise(resolve => setTimeout(resolve, duration.value))
    direction.value = 'forward'
  }
})

</script>

<style lang="scss" scoped>
.slide-enter-from,
.slide-leave-to,
.slide-zoom-enter-from,
.slide-zoom-leave-to {
  position: absolute !important;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
}

// 设置过渡中心点
.slide-zoom-enter-from,
.slide-zoom-enter-to,
.slide-zoom-leave-from,
.slide-zoom-leave-to {
  transform-origin: 0 50%;
}

.forward {

  &.slide-enter-from,
  &.slide-zoom-enter-from {
    transform: translateX(v-bind(slideDistance));
  }

  &.slide-enter-to,
  &.slide-zoom-enter-to {
    transform: translateX(0);
  }

  &.slide-zoom-leave-from {
    transform: scale(1, 1);
  }

  &.slide-zoom-leave-to {
    transform: scale(v-bind(zoomRatio), v-bind(zoomRatio));
  }
}

.back {

  &.slide-leave-from,
  &.slide-zoom-leave-from {
    transform: translateX(0);
  }

  &.slide-leave-to,
  &.slide-zoom-leave-to {
    transform: translateX(v-bind(slideDistance));
  }

  &.slide-leave-active,
  &.slide-zoom-leave-active {
    z-index: 1;
  }

  &.slide-zoom-enter-from {
    transform: scale(v-bind(zoomRatio), v-bind(zoomRatio));
  }

  &.slide-zoom-enter-to {
    transform: scale(1, 1);
  }
}

.slide-enter-to,
.slide-leave-from,
.slide-zoom-enter-to,
.slide-zoom-leave-from {
  opacity: 1;
}

.slide-enter-active,
.slide-leave-active,
.slide-zoom-enter-active,
.slide-zoom-leave-active {
  transition:
    transform v-bind(mainTime),
    opacity v-bind(secondaryTime);
}
</style>