import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    hidden?: boolean
    permission?: string
    order?: number
    affix?: boolean
    group?: string
  }
}
