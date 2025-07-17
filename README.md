# vue3-element-plus-base

基于 Vue 3 + TypeScript + Element-Plus + Vite 搭建项目应用的基础模版

## 项目依赖安装

```sh
pnpm install
```

## 特点

- 较精细的优化工程各种配置 (工程目录、打包分块、压缩等等)
- yapi-to-typescript 自动定义后端接口数据类型
- 用户鉴权路由 (根据用户登录的权限, 动态添加、销毁路由)
- Element Plus 全局 Provider 响应式配置 (可动态切换 语言、组件大小、按钮、链接、消息等全局配置)
- 内置路由组件转场动效 (内置了 slide、slide-zoom, 可高度自定义转场动效, 例如使用 animate css 库自定义)
- 动态表单 (通过数据配置动态生成表单, 高度自由, 高度灵活, 快速构建表单)
- 全局公共组件 (shuttle 转场动效组件, context-menu 桌面右键菜单, dynamic-form 动态表单 ...)
