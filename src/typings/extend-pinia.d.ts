import 'pinia'

declare namespace ExtendPinia {
  declare interface IStoreResetOriginalCallback {
    (): Pinia.StateTree & Pinia.PiniaCustomStateProperties<Pinia.StateTree>
  }
  
  declare interface IStoreReset {
    (originalCallback?: IStoreResetOriginalCallback): void
  }
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // 标注 router 类型
    router: VueRouter.Router
    // 标注重置 store 状态指定初始值
    $reset: ExtendPinia.IStoreReset
  }
}