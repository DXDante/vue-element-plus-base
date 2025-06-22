<template>
  <div class="user-panel-wrap">
    <el-icon color="#11171C" size="18" @click.stop="logout">
      <Close />
      <!-- <Bicycle /> -->
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
// import { Bicycle } from '@element-plus/icons-vue'
import { useUserStore } from 'stores/user/index'

defineOptions({
  name: 'user-panel'
})

const { logout: userStoreLogout } = useUserStore()

const logout = async () => {
  await userStoreLogout()
}
</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>