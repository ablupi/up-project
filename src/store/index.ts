import { createStore } from 'vuex'

export default createStore({
  state: {
    menuKey:''
  },
  getters: {
    // 新增menuKey用于存储全局的菜单key
    getMenuKey(state: any) {
      return state.menuKey
    }
  },
  mutations: {
    setMenuKey(state: any, value: any) {
      state.menuKey = value
    }
  },
  actions: {
  },
  modules: {
  }
})
