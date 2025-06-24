import { computed, reactive, readonly, ref } from 'vue'

// 语言 - 选项 (加载模块通过 value 加载)
const langUseNames = readonly([
  { name: '简体中文', value: 'zh-cn' },
  { name: 'English', value: 'en' }
])
// 语言 - 模块名称
const langUseModuleNames = computed(() => langUseNames.map(({ value }) => value))
// 语言 - 模块集
const langModules = (() => {
  const langOriginModules: Record<string, unknown> | null = import.meta.glob(
    'node_modules/element-plus/es/locale/lang/*.mjs',
    { eager: true }
  )
  const langNameRegexp = /(\/node_modules\/element-plus\/es\/locale\/lang\/|\.mjs)/g
  const res: Record<string, unknown> = {}

  for (const [pathName, pathModule] of Object.entries(langOriginModules)) {
    const name = pathName.replace(langNameRegexp, '')
    if (langUseModuleNames.value.includes(name)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      res[name] = (pathModule as any).default
    }
  }

  return res
})()
// 当前使用的语言
const langCurrentUse = ref('zh-cn')
// 当前使用的语言模块
const langCurrentUseModule = computed(() => langModules[langCurrentUse.value])

// Element-Plus 全局配置 (以下通过方法修改)
const providerOptions = reactive({
  size: 'default', // large, default, small
  zIndex: 21,
  // namespace: 'el',
  button: {
    type: 'primary',
    autoInsertSpace: false,
    plain: false,
    round: false
  },
  link: {
    type: 'default',
    underline: 'hover'
  },
  message: {
    max: 10,
    grouping: false,
    duration: 2500,
    showClose: true,
    offset: 20,
    plain: false
  }
  // emptyValues: [],
  // valueOnClear: ''
})

/**
 * 切换语言
 * @param lang 语言值
 */
const switchLocaleConfig = (lang: string) => {
  if (!langUseModuleNames.value.includes(lang)) {
    return
  }

  langCurrentUse.value = lang
}

/**
 * 切换全局组件大小
 * @param size 大小
 */
const switchSizeConfig = (size: ElementPlus.ConfigProviderSizeType) => {
  providerOptions.size = size
}

/**
 * 切换按钮配置
 * @param config 按钮配置
 */
const switchButtonConfig = (config: ElementPlus.ConfigProviderButtonType) => {
  Object.assign(providerOptions.button, config)
}

/**
 * 切换链接配置
 * @param config 按钮配置
 */
const switchLinkConfig = (config: ElementPlus.ConfigProviderLinkType) => {
  Object.assign(providerOptions.link, config)
}

/**
 * 切换消息配置
 * @param config 按钮配置
 */
const switchMessageConfig = (config: ElementPlus.ConfigProviderMessageType) => {
  Object.assign(providerOptions.message, config)
}

const useElementConfig = () => {
  return {
    langUseNames,
    langCurrentUse: computed(() => langCurrentUse.value),
    options: computed(() => ({ ...providerOptions, locale: langCurrentUseModule })),
    switchLocaleConfig,
    switchSizeConfig,
    switchButtonConfig,
    switchLinkConfig,
    switchMessageConfig
  }
}

export default useElementConfig
