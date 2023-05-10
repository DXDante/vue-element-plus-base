import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'

import ElementPlus from 'unplugin-element-plus/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: (env.NODE_ENV === 'production' ? './' : '/'),
    plugins: [
      vue(),
      DefineOptions(),
      vueJsx({
        transformOn: true,
        optimize: true
      }),
      AutoImport({
        // imports: ['vue'],
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({ prefix: 'Icon' })
        ],
        dts: './auto-imports.d.ts'
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({ enabledCollections: ['ep'] })
        ],
        dts: './components.d.ts'
      }),
      Icons({
        autoInstall: true,
        compiler: 'vue3'
      }),
      visualizer(),
      // 按需导入且自定义主题时, 需要在使用的组件中导入对应的组件 SCSS, 如下(建议这样, 虽然麻烦但可减少打包样式的代码, 但你也可以不这样做)
      // 例如: import 'element-plus/es/components/button/style/index'
      ElementPlus({
        useSource: true
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // 定义自定义主题变量
          additionalData: `@use "./styles/define-theme.scss" as *;`,
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'api': fileURLToPath(new URL('./src/api', import.meta.url)),
        'assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        'components': fileURLToPath(new URL('./src/components', import.meta.url)),
        'config': fileURLToPath(new URL('./src/config', import.meta.url)),
        'hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
        'layout': fileURLToPath(new URL('./src/layout', import.meta.url)),
        'mock': fileURLToPath(new URL('./src/mock', import.meta.url)),
        'plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
        'router': fileURLToPath(new URL('./src/router', import.meta.url)),
        'services': fileURLToPath(new URL('./src/services', import.meta.url)),
        'stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
        'styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
        'typings': fileURLToPath(new URL('./src/typings', import.meta.url)),
        'utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        'views': fileURLToPath(new URL('./src/views', import.meta.url))
      }
    },
    server: {
      host: true,
      proxy: {
        '/api': {
          target: 'https://xxxx.cn/api/test',
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      hmr: {
        overlay: false
      }
    }
  }
})
