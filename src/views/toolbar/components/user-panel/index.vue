<template>
  <div class="user-panel-wrap">
    <el-icon color="#11171C" size="18" @click.stop="logout">
      <Bicycle />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
// import { Bicycle } from '@element-plus/icons-vue'
import { useUserStore } from 'stores/user/index'

const { logout: userStoreLogout } = useUserStore()

const logout = async () => {
  await userStoreLogout()
}
</script>

<style lang="scss" scoped>
@import "./index";
</style>