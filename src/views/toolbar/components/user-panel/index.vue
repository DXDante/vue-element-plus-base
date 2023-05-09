<template>
  <div class="user-panel-wrap">
    <el-icon color="#11171C" size="18" @click.stop="logout">
      <!-- <Setting /> -->
      退
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user/index'

const router = useRouter()
const { logout: userStoreLogout } = useUserStore()

const logout = async () => {
  if (await userStoreLogout()) {
    router.replace({ name: 'sign-in' })
  }
}
</script>

<style lang="scss" scoped>
@import "./index";
</style>