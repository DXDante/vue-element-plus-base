import { defineConfig } from 'yapi-to-typescript'

/**
 * 生成 Api 接口名称  Interface 和 ChangeCase 数据类型参见 node_modules\yapi-to-typescript\lib\esm\index.d.ts 定义
 * @param interfaceInfo
 * @param changeCase
 * @returns 请求响应接口名称--pascal命名
 */
const genApiInterfaceName = (interfaceInfo, changeCase) => {
  // 取解析路径 dir 最尾部的路径作为前缀路径
  const lastPath = interfaceInfo.parsedPath.dir.split('/').pop()
  // 拼接前缀路径 + 文件名称
  return `${changeCase.pascalCase(lastPath)}${changeCase.pascalCase(interfaceInfo.parsedPath.name)}`
}

export default defineConfig([
  {
    target: 'typescript',
    typesOnly: true,
    reactHooks: {
      enabled: false
    },
    devEnvName: '',
    prodEnvName: '',
    // 响应数据中要生成 ts 数据类型的键名
    dataKey: 'data',
    serverUrl: '',
    outputFilePath: (interfaceInfo, changeCase) => {
      // 文件夹名称取 api-url 路径末尾 2 个
      const filePaths = interfaceInfo.path.split('/').slice(-2)
      // 按照分类生成
      return `src/types/api/${filePaths[0]}.d.ts`
      // 按照分类/具体接口的模式生成（文件数量会巨大）
      // const filePath = filePaths.map((item) => changeCase.camelCase(item)).join('/');
      // return `src/types/api/${filePath}.d.ts`;
    },
    // 生成 ts 文件中请求参数 interface 名称, 将下划线命名转换成 pascal 命名
    getRequestDataTypeName: (interfaceInfo, changeCase) => {
      return `${genApiInterfaceName(interfaceInfo, changeCase)}Request`
    },
    // 生成ts文件中请求响应数据interface名称,将下划线命名转换成pascal命名
    getResponseDataTypeName: (interfaceInfo, changeCase) => {
      return `${genApiInterfaceName(interfaceInfo, changeCase)}Response`
    },
    projects: [
      {
        // token 获取方式: 在 yapi - 设置 - token 配置中查看
        // 出现 [没有权限] 报错时, 先查询 token 是否已经更新
        token: '',
        // 分类 id 查找方式: 点击接口左侧的分类菜单, 查看 url 地址栏最后面的数字获取
        // 分类 id 配置特别重要, 配置错了无法生成对应的 ts 数据类型定义文件
        categories: [
          {
            id: []
          }
        ]
      }
    ]
  }
])
