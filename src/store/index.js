import { createStore } from 'vuex'
import peopleModule from './module/people.js'  //module模块的使用，引入分离出去的模块
import workModule from './module/work.js'  //module模块的使用，引入分离出去的模块

export default createStore({
  state: {
    normalCount:99,
  },
  mutations: {
    setNormalCount(state,data){
      state.normalCount = data
    }
  },
  actions: {
    asyncSetNormalCount(context,data){
      context.commit('setNormalCount',data)
    }
  },
  getters:{
    getNormalCount(state){
      return state.normalCount+30000
    }
  },
  modules: {
    peopleModule,
    workModule
  }
})
