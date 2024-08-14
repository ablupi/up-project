import { createStore } from 'vuex'

export default createStore({
  state: {
    menuKey:'',
    moduleMenuKey: ''
  },
  getters: {
    // 新增menuKey用于存储全局的菜单key
    getMenuKey(state: any) {
      return state.menuKey
    },
    getModuleMenuKey(state: any) {
      return state.moduleMenuKey
    }
  },
  mutations: {
    setMenuKey(state: any, value: any) {
      state.menuKey = value
    },
    setModuleMenuKey(state: any, value: any) {
      state.moduleMenuKey = value
    }
  },
  actions: {
  },
  modules: {
  }
})
