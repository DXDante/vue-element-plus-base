<template>
  <div class="user-panel-wrap bs-b d-f flex-ai-c">
    <el-icon color="#11171C" size="18" @click.stop="logout">
      <Close />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
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