export type ShuttleMode = 'slide' | 'slide-zoom'

export interface IShuttleTransitionClass {
  enterFromClass?: string
  enterActiveClass?: string
  enterToClass?: string
  leaveFromClass?: string
  leaveActiveClass?: string
  leaveToClass?: string
}

export interface IShuttleProps {
  mode?: ShuttleMode
  duration?: number
  slideSize?: number
  zoomSize?: number
  transitionClass?: IShuttleTransitionClass
}
