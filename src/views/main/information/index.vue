<template>
  <div class="information-wrap component-wrap pd d-f flex-ff-c flex-ai-c">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" style="max-width: 600px" :status-icon="true">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="地址" prop="region">
        <el-select v-model="form.region" placeholder="请选择地址">
          <el-option label="上海" value="shanghai" />
          <el-option label="北京" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="虚拟选择器" prop="count">
        <el-select-v2 v-model="form.count" placeholder="请选择虚拟选择器的值" :options="virtualizedOptions" />
      </el-form-item>
      <!------------------------------  ------------------------------>
      <el-form-item label="日期时间选择" required>
        <div class="d-f flex-ai-c flex-jc-c bs-b">
          <el-form-item prop="date1">
            <el-date-picker v-model="form.date1" type="date" aria-label="选择日期" placeholder="请选择日期"
              style="width: 100%" />
          </el-form-item>
          <el-form-item prop="date2">
            <el-time-picker v-model="form.date2" aria-label="选择时间" placeholder="请选择时间" style="width: 100%" />
          </el-form-item>
        </div>
        <!-- <el-col :span="11"></el-col> -->
        <!-- <el-col class="text-center" :span="2">
          <span class="text-gray-500">-</span>
        </el-col> -->
        <!-- <el-col :span="11"></el-col> -->
      </el-form-item>
      <!------------------------------  ------------------------------>
      <el-form-item label="Switch 开关" prop="delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="分段控制器(类似于单选)" prop="location">
        <el-segmented v-model="form.location" :options="locationOptions" />
      </el-form-item>
      <el-form-item label="活动(多选)" prop="type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox v-for="(item) of typeOptions" :key="item.value" :value="item.value">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="资源(单选)" prop="resource">
        <el-radio-group v-model="form.resource">
          <el-radio v-for="(item) of resourceOptions" :key="item.value" :value="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式(文本域)" prop="desc">
        <el-input v-model="form.desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" resize="none" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">
          Create
        </el-button>
        <el-button @click="resetForm(formRef)">Reset</el-button>
      </el-form-item>
    </el-form>
    <div class="btn-wrap bs-b d-f flex-ai-c" style="margin-top: 50px;">
      <el-button type="primary" round @click.stop="toBack">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'

defineOptions({
  name: 'main-information'
})

interface FormRule {
  name: string
  region: string
  count: string
  date1: string
  date2: string
  delivery: boolean
  location: string
  type: string[]
  resource: string
  desc: string
}

const formRef = ref<ElementPlus.FormInstance>()
const form = reactive<FormRule>({
  name: '',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  location: '',
  type: [],
  resource: '',
  desc: ''
})
const rules = reactive<ElementPlus.FormRules<FormRule>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    { required: true, message: 'Please select Activity zone', trigger: 'change' },
  ],
  count: [
    { required: true, message: 'Please select Activity count', trigger: 'change' },
  ],
  date1: [
    { required: true, type: 'date', message: 'Please pick a date', trigger: 'change' },
  ],
  date2: [
    { required: true, type: 'date', message: 'Please pick a time', trigger: 'change' },
  ],
  location: [
    { required: true, message: 'Please select a location', trigger: 'change' },
  ],
  type: [
    { required: true, type: 'array', message: 'Please select at least one activity type', trigger: 'change' },
  ],
  resource: [
    { required: true, message: 'Please select activity resource', trigger: 'change' },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ]
})

const virtualizedOptions = Array.from({ length: 10000 }).map((_, idx) => ({
  label: `${idx + 1}`,
  value: `${idx + 1}`
}))
const locationOptions = [
  { label: '家', value: 'home' },
  { label: '公司', value: 'company' },
  { label: '学校', value: 'school' }
]
const typeOptions = [
  { label: '在线活动', value: 'online' },
  { label: '线下活动', value: 'offline' },
  { label: '促销活动', value: 'promotion' },
]
const resourceOptions = [
  { label: '赞助', value: 'sponsorship' },
  { label: '地点', value: 'venue' }
]

const submitForm = async (formEl: ElementPlus.FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: ElementPlus.FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const router = useRouter()
const toBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@use "./index" as *;
</style>