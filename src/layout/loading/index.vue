<template>
  <div v-show="commonStoreLoadingState" class="loading-wrap bs-b p-f d-f flex-jc-c flex-ai-c" @click.stop
    @dblclick.stop>
    <svg class="loading-svg bs-b" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      style="margin:auto;background:transparent;display:block;" width="200px" height="200px" viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid">
      <defs>
        <clipPath id="progress-rxiqew2jbk8-cp" x="0" y="0" width="100" height="100">
          <rect x="0" y="0" width="0" height="100">
            <animate attributeName="width" repeatCount="indefinite" dur="1s" values="0;100;100" keyTimes="0;0.5;1">
            </animate>
            <animate attributeName="x" repeatCount="indefinite" dur="1s" values="0;0;100" keyTimes="0;0.5;1"></animate>
          </rect>
        </clipPath>
      </defs>
      <!-- stroke="#020621" -->
      <path fill="none" stroke="#c0c0c0" stroke-width="2.79"
        d="M12.000000000000004 41.394999999999996L87.99999999999999 41.394999999999996A8.605 8.605 0 0 1 96.60499999999999 50L96.60499999999999 50A8.605 8.605 0 0 1 87.99999999999999 58.605000000000004L12.000000000000004 58.605000000000004A8.605 8.605 0 0 1 3.395000000000003 50L3.395000000000003 50A8.605 8.605 0 0 1 12.000000000000004 41.394999999999996 Z">
      </path>
      <path fill="#2bde73" clip-path="url(#progress-rxiqew2jbk8-cp)"
        d="M12.000000000000004 45.489999999999995L87.99999999999999 45.489999999999995A4.51 4.51 0 0 1 92.50999999999999 49.99999999999999L92.50999999999999 50.00000000000001A4.51 4.51 0 0 1 87.99999999999999 54.510000000000005L12.000000000000004 54.510000000000005A4.51 4.51 0 0 1 7.490000000000004 50.00000000000001L7.490000000000004 49.99999999999999A4.51 4.51 0 0 1 12.000000000000004 45.489999999999995 Z">
      </path>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCommonStore } from 'stores/common'

defineOptions({
  name: 'loading-index'
})

const { loadingState: commonStoreLoadingState } = storeToRefs(useCommonStore())
</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>