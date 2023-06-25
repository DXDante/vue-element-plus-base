/// <reference types="vite/client" />

// TODO: 自定义环境变量类型提示
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}