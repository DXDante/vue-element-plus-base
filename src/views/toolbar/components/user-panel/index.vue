<template>
  <div class="user-panel-wrap">
    <el-icon color="#11171C" size="18" @click.stop="logout">
      <Setting />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from 'stores/user/index'

const { logout: userStoreLogout } = useUserStore()

const logout = async () => {
  await userStoreLogout()
}
</script>

<style lang="scss" scoped>
@import "./index";
</style>