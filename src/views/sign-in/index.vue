<template>
  <div class="sign-in-wrap component-wrap d-f flex-ff-c flex-jc-c flex-ai-c">
    <div class="content">
      <el-form ref="formComponentRef" :model="form" :rules="formRules" label-width="60px">
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone" maxlength="11" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" maxlength="11" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loggingIn" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from 'stores/user/index'
import { useForm } from './hooks/use-form'
import { ref } from 'vue'

defineOptions({
  name: 'sign-in'
})

const { login: userStoreLogin } = useUserStore()
const { formComponentRef, form, formRules, formValidate } = useForm()
const loggingIn = ref(false)

// 登录
const login = async () => {
  if (loggingIn.value) { return }
  if (await formValidate()) {
    loggingIn.value = true
    const { phone, password } = form
    await userStoreLogin({ phone, password })
    loggingIn.value = false
  }
}
</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>