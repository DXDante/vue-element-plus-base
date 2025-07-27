import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'

import ElementPlus from 'unplugin-element-plus/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig(({ /*command, */ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_PROJECT_BASE_URL,
    plugins: [
      vue(),
      // DefineOptions(),
      vueJsx({
        transformOn: true,
        optimize: true
      }),
      vueDevTools(),
      AutoImport({
        include: [/\.tsx?$/, /\.vue$/, /\.vue\?vue/],
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({ prefix: 'Icon' })
        ],
        dts: './auto-imports.d.ts'
      }),
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          // 自动注册图标组件
          IconsResolver({ enabledCollections: ['ep'] }),
          ElementPlusResolver({
            importStyle: 'sass', // 使用 sass 而不是 css
            directives: true // 自动导入指令
          })
        ],
        dts: './components.d.ts'
      }),
      Icons({
        autoInstall: true
      }),
      // 按需导入且自定义主题时, 需要在使用的组件中导入对应的组件 SCSS, 如下(建议这样, 虽然麻烦但可减少打包样式的代码, 但你也可以不这样做)
      // 例如: import 'element-plus/es/components/button/style/index'
      ElementPlus({
        useSource: true
      }),
      visualizer({
        open: true,
        filename: 'stats.html',
        // template: 'treemap', // 使用树状图分析
        gzipSize: true,
        brotliSize: true
        // sourcemap: true // 关联 sourcemap 查看源码占比
      }),
      // Brotli 压缩
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 10240, // 大于 10KB 的文件才压缩
        deleteOriginFile: false, // 不删除源文件
        verbose: true
      })
      // // Gzip 压缩 (兼容性高, 如果为了兼容性, 可开启双压缩)
      // viteCompression({
      //   algorithm: 'gzip',
      //   ext: '.gz',
      //   threshold: 10240,
      //   deleteOriginFile: false,
      //   verbose: true
      // })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // 定义自定义主题变量
          // @use "element-plus/theme-chalk/src/index.scss" as ep;
          additionalData: `
            @use "./styles/define-theme.scss" as *;
          `,
          api: 'modern-compiler'
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        api: fileURLToPath(new URL('./src/api', import.meta.url)),
        assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
        components: fileURLToPath(new URL('./src/components', import.meta.url)),
        config: fileURLToPath(new URL('./src/config', import.meta.url)),
        hooks: fileURLToPath(new URL('./src/hooks', import.meta.url)),
        layout: fileURLToPath(new URL('./src/layout', import.meta.url)),
        mock: fileURLToPath(new URL('./src/mock', import.meta.url)),
        plugins: fileURLToPath(new URL('./src/plugins', import.meta.url)),
        router: fileURLToPath(new URL('./src/router', import.meta.url)),
        services: fileURLToPath(new URL('./src/services', import.meta.url)),
        stores: fileURLToPath(new URL('./src/stores', import.meta.url)),
        styles: fileURLToPath(new URL('./src/styles', import.meta.url)),
        types: fileURLToPath(new URL('./src/types', import.meta.url)),
        utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
        views: fileURLToPath(new URL('./src/views', import.meta.url))
      }
    },
    server: {
      host: true,
      port: 3000,
      // proxy: {
      //   '/api': {
      //     target: 'https://xxxx.cn/api/test',
      //     ws: true,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // },
      hmr: {
        overlay: false,
        protocol: 'ws',
        host: 'localhost'
      },
      fs: {
        strict: false, // 解决 monorepo 潜在问题
        allow: ['..'] // 允许访问上级目录
      }
    },
    build: {
      chunkSizeWarningLimit: 500,
      cssCodeSplit: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            // TODO: 这里匹配条件比较宽泛, 不应该把 vue 放在最前面, 会导致相关的依赖被打包到 core 中, 应该先匹配精确的匹配, 再匹配 vue 关键词的宽泛匹配
            if (id.includes('node_modules')) {
              // 1) 第三方依赖
              if (id.includes('lodash-es')) {
                return 'lodash-es'
              }
              if (id.includes('axios')) {
                return 'axios'
              }
              if (id.includes('dayjs')) {
                return 'dayjs'
              }

              // ... 其他库优先匹配

              // 2) Element Plus
              if (id.includes('element-plus')) {
                // 2.1) 图标库
                if (id.includes('@element-plus/icons-vue')) {
                  return 'element-icons'
                }

                // 2.2) 组件
                if (id.includes('element-plus/es/components')) {
                  const match = /\/components\/(.+?)\//.exec(id)
                  return match ? `element-plus-${match[1]}` : 'element-plus-extra'
                }

                // 2.3) 其他部分
                if (id.includes('element-plus/es')) {
                  return 'element-core'
                }
              }

              // 3) Vue 生态相关(先匹配)
              if (id.includes('pinia')) {
                return 'pinia'
              }
              if (id.includes('vue-router')) {
                return 'vue-router'
              }

              // 4) Vue
              if (id.includes('vue') || id.includes('@vue')) {
                return 'vue-core'
              }

              // 5) 剩余 node_modules 合并到 vendor
              return 'vendor'
            }
          },
          entryFileNames: `assets/[name]-[hash].js`,
          chunkFileNames: `assets/[name]-[hash].js`,
          assetFileNames: `assets/[name]-[hash].[extname]`
        }
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia'],
      exclude: ['vue-demi']
    }
  }
})
