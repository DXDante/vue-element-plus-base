import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

/**
 * Element 全局服务组件挂载 (该方式只适用于 options 方式, 不适用 composition, 因为需要调用 getCurrentIntance 并从 proxy 属性中得到, 但在模板里可直接使用)
 * 如果你使用 <script setup> 定义组件, 请在组件中按需导入, 例如: import { ElMessage } from 'element-plus'
 */

export default {
  install(app: Vue.App) {
    // Message
    app.config.globalProperties.$message = ElMessage
    // MessageBox
    app.config.globalProperties.$msgbox = ElMessageBox
    app.config.globalProperties.$alert = ElMessageBox.alert
    app.config.globalProperties.$confirm = ElMessageBox.confirm
    app.config.globalProperties.$prompt = ElMessageBox.prompt
    // Notification
    app.config.globalProperties.$notify = ElNotification
  }
}
