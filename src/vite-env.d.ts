/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vuex'
declare module 'element-resize-detector'
declare module '@/assets/js/iscroll-probe'
declare module 'xml-reader' {
  export const parseSync: any
}
