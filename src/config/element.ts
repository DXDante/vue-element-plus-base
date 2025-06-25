import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { computed, reactive, readonly, ref, toRefs } from 'vue'

// 语言 - 模块集
const langModules: Record<string, ElementPlus.ConfigProviderLocaleType> = {
  'zh-cn': zhCn,
  en: en
}
// 语言 - 选项
const langUseList = readonly([
  { name: '简体中文', value: 'zh-cn' },
  { name: 'English', value: 'en' }
])
// 语言 - 模块名称
const langUseModuleNames = langUseList.map(({ value }) => value)
// 语言 - 当前使用类型 (默认 zh-cn)
const langCurrentUse = ref(langUseList[0].value)
// 语言 - 当前使用类型输出
const langCurrentUseOutput = readonly(langCurrentUse)
// 语言 - 当前使用类型模块
const langCurrentUseModule = computed(() => langModules[langCurrentUse.value])

// Element-Plus 全局配置 (动态数据)
const options = reactive<ElementPlus.ConfigProviderOptionsType>({
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

const optionsOutput = readonly(toRefs(options))

/**
 * 切换语言
 * @param lang 语言值
 */
const switchLocaleConfig = (lang: string) => {
  if (!langUseModuleNames.includes(lang)) {
    return
  }

  langCurrentUse.value = lang
}

/**
 * 切换全局组件大小
 * @param size 大小
 */
const switchSizeConfig = (size: ElementPlus.ConfigProviderSizeType) => {
  options.size = size
}

/**
 * 切换按钮配置
 * @param config 按钮配置
 */
const switchButtonConfig = (config: ElementPlus.ConfigProviderButtonType) => {
  Object.assign(options.button!, config)
}

/**
 * 切换链接配置
 * @param config 按钮配置
 */
const switchLinkConfig = (config: ElementPlus.ConfigProviderLinkType) => {
  Object.assign(options.link!, config)
}

/**
 * 切换消息配置
 * @param config 按钮配置
 */
const switchMessageConfig = (config: ElementPlus.ConfigProviderMessageType) => {
  Object.assign(options.message!, config)
}

const useElementConfig = () => {
  return {
    ...optionsOutput,
    langUseList,
    langCurrentUse: langCurrentUseOutput,
    locale: langCurrentUseModule,
    switchLocaleConfig,
    switchSizeConfig,
    switchButtonConfig,
    switchLinkConfig,
    switchMessageConfig
  }
}

export default useElementConfig
