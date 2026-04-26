export default { /* 分离出来的模块，使用export default导出对象，对象里面有state,mutations,actions,getters,modules */
    state:{
        peoModuleCount:999
    },
    mutations:{
        setPeoModuleCount(state,params){
            state.peoModuleCount = params
        }
    },
    actions:{
        asycnSetPeoModuleCount(context,params){
            context.commit('setPeoModuleCount',params)
        }
    },
    getters:{
        getPeoModuleCount(state){
            return state.peoModuleCount+10000
        }
    },
    modules:{},
    namespaced:true,//是否开启命名空间
}   