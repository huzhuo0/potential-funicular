export default { /* 分离出来的模块，使用export default导出对象，对象里面有state,mutations,actions,getters,modules */
    state:{
        workModuleCount:9999
    },
    mutations:{
        setWorkModuleCount(state,params){
            state.workModuleCount = params
        },
        setPeoModuleCount(state,params){
            state.workModuleCount = params
        }
    },
    actions:{
        asycnSetWorkModuleCount(context,params){
            context.commit('setWorkModuleCount',params)
        }
    },
    getters:{
        getWorkModuleCount1(state){
            return state.workModuleCount+20000
        }
    },
    modules:{},
    namespaced:true,//是否开启命名空间
}   