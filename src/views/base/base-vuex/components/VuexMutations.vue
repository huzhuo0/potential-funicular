<!-- 
    vuex分模块为什么要使用命名空间呢？
    默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的。
    弊端1：不同模块中有相同命名的mutations、actions时，不同模块对同一 mutation 或 action 作出响应。
    弊端2：当一个项目中store分了很多模块的时候，在使用辅助函数mapState、mapGetters、mapMutations、mapActions时，
           很难查询，引用的state、getters、mutations、actions来自于哪个模块，不便于后期维护。
           就是...mapState(['normalCount'])不知道这个normalCount是来自那边模块的
    可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 
           及 mutation 都会自动根据模块注册的路径调整命名。
           eg:没加命名空间前：this.$store.getters.getPeoModuleCount  可以正常使用
           eg:加了命名空间后：this.$store.getters['peopleModule/getPeoModuleCount']  这样才能获取到peopleModule模块里面的getters的值
                            this.$store.getters.getPeoModuleCount加了命名空间这样是获取不到peopleModule模块里面的getters的值
 -->
<template>
  <div style="background: #fff">
    <p>
      vuex中mutations的使用
      <span class="vuexdata"
        >非模块：{{ normalCount }} peopleModule模块
        {{ peoModuleSta }} workModule模块 {{ workModuleSta }}</span
      >
    </p>
    <div>
      <div>
        <p>非module中的Mutations的使用1:</p>
        <p style="margin-left: 50px">
          通过this.$store.commit('事件名'，参数变量)
        </p>
        <el-button
          class="vuexdata"
          style="display: inline-block"
          @click="testMuta0"
          >this.$store.commit('setNormalCount',1000)触发测试</el-button
        >
        <!-- <el-button class="vuexdata" style="display:block" @click="testMuta1">this.$store.commit('setPeoModuleCount',1000)触发测试</el-button>
            <p>因为mutations是注册在全局空间的，所以我们直接触发peopleModule模块里面的mutations中的setPeoModuleCount是可以成功的</p>
            <p>如果其他模块也有setPeoModuleCount方法，那么此时也会触发，两个模块里面的setPeoModuleCount都会触发，打印台会报错</p>
            <p>如果想各个模块独立的话，我们可以加上命名空间，加上命名空间后，也直接这样调用的话this.$store.commit('setPeoModuleCount',1000)，只会触发没有加命名空间的模块的，setPeoModuleCount</p>
            <p>如果都加上命名空间的话就都不会触发，只有打印会报错说找不到unknown mutation type: setPeoModuleCount</p> -->
      </div>
      <div>
        <p>非module中的Mutations的使用2:</p>
        <p style="margin-left: 50px">
          通过mapMutations 使用import {mapMutations} from 'vuex'
          然后在methods中使用...mapMutation
        </p>
        <p style="margin-left: 50px">import {mapMutation} from 'vuex'</p>
        <p style="margin-left: 50px">
          methods:{...mapMutation(['事件名'])}
          <el-button class="vuexdata" @click="testMuta2"
            >使用辅助函数this.setNormalCount(1002)</el-button
          >
        </p>
        <p style="margin-left: 50px">
          methods:{...mapMutation({'重名名':'mutations中的事件名'})}
          <el-button class="vuexdata" @click="testMuta3"
            >使用辅助函数this.noModuleMutation(1003)</el-button
          >
        </p>
      </div>
      <div>
        <p>
          module中的Mutations的使用1:
          用不分模块的方式直接触发模块里面的事件（没有使用命名空间，使用了命名空间这种方法就不行了，因为路径发生变化了）
        </p>
        <p style="margin-left: 50px">
          通过this.$store.commit('模块中的事件名'，参数变量)
          <el-button
            class="vuexdata"
            style="display: inline-block"
            @click="testMuta1"
            >this.$store.commit('setPeoModuleCount',1000)直接触发peopleModule模块里面的mutation方法</el-button
          >
        </p>
        <p style="margin-left: 50px">
          因为mutations是注册在全局空间的，所以我们直接触发peopleModule模块里面的mutations中的setPeoModuleCount是可以成功的
        </p>
        <p style="margin-left: 50px">
          如果其他模块也有setPeoModuleCount方法，那么此时也会触发，两个模块里面的setPeoModuleCount都会触发，页面也会更新，同时打印台会报错
        </p>
        <p style="margin-left: 50px">
          如果想各个模块独立的话，我们可以加上命名空间，加上命名空间后，也直接这样调用的话this.$store.commit('setPeoModuleCount',1000)，只会触发没有加命名空间的模块的，setPeoModuleCount
        </p>
        <p style="margin-left: 50px">
          如果都加上命名空间的话就都不会触发，只有打印会报错说找不到unknown
          mutation type: setPeoModuleCount
        </p>
      </div>
      <div>
        <p>
          module中的Mutations的使用2:
          分模块的方式触发模块里面的事件:使用命名空间
        </p>
        <p style="margin-left: 50px">
          通过this.$store.commit('模块A/模块中的事件名'，参数变量)
          <el-button
            class="vuexdata"
            style="display: inline-block"
            @click="testMuta4"
            >this.$store.commit('peopleModule/setPeoModuleCount',1004)</el-button
          >
        </p>
      </div>
      <div>
        <p>
          module中的Mutations的使用3:
          分模块的方式触发模块里面的事件:使用命名空间+辅助函数mapMutations
        </p>
        <p style="margin-left: 50px">import {mapMutations} from 'vuex'</p>
        <p style="margin-left: 50px">
          在methods中引入mapMutations
          methods:{...mapMutations('模块名A'['模块名A中的方法'])}
          eg:methods:{...mapMutations('workModule'['setWorkModuleCount'])}
        </p>
        <p style="margin-left: 50px">
          数组模式：<el-button
            class="vuexdata"
            style="display: inline-block"
            @click="testMuta5"
            >...mapMutation('workModule',['setWorkModuleCount'])
            this.setWorkModuleCount(1005)</el-button
          >
        </p>
        <p style="margin-left: 50px">
          对象模式：<el-button
            class="vuexdata"
            style="display: inline-block"
            @click="testMuta6"
            >...mapMutation('workModule',{'newWorkModuCouSet':'setWorkModuleCount'}])
            this.newWorkModuCouSet(1006)</el-button
          >
        </p>
      </div>
      <div>
        <p>
          module中的Mutations的使用4:
          分模块的方式触发模块里面的事件:使用命名空间+辅助函数mapMutations+createNamespacedHelpers创建基于某个命名空间辅助函数
        </p>
        <p style="margin-left: 50px">
          import {createNamespacedHelpers} from 'vuex'
        </p>
        <p style="margin-left: 50px">
          const {mapMutations} = createNamespacedHelpers('模块名B') eg:const
          {mapMutations} = createNamespacedHelpers('workModule')
        </p>
        <p style="margin-left: 50px">
          在methods中引入mapMutations
          methods:{...mapMutations(['模块名B中的方法'])}
          eg:methods:{...mapMutations(['setWorkModuleCount'])}
        </p>
        <p style="margin-left: 50px">
          数组模式：<el-button
            class="vuexdata"
            style="display: inline-block"
            @click="testMuta7"
            >...mapMutation(['setWorkModuleCount'])
            this.setWorkModuleCount(1007)</el-button
          >
        </p>
        <p style="margin-left: 50px">
          对象模式：<el-button
            class="vuexdata"
            style="display: inline-block"
            @click="testMuta8"
            >...mapMutation({'createNewWorkModuCouSet':'setWorkModuleCount'}])
            this.createNewWorkModuCouSet(1008)</el-button
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import { createNamespaceHelpers } from 'vuex'
// let { mapState } = createNamespaceHelpers('workModule')

export default {
  name: "VuexMutations",
  data() {
    return {};
  },
  mounted() {
    // console.log(this.$store,'223')
  },
  methods: {
    ...mapMutations(["setNormalCount"]), //非模块  参数是数组模式
    ...mapMutations({ noModuleMutation: "setNormalCount" }), //非模块  参数是对象模式
    ...mapMutations("workModule", ["setWorkModuleCount"]), //模块  参数是数组形式
    ...mapMutations("workModule", { newWorkModuCouSet: "setWorkModuleCount" }), // 模块 参数是对象模式
    // ...mapMutations(['setWorkModuleCount']),
    // ...mapMutations({'newWorkModuCouSet':'setWorkModuleCount'}),
    testMuta0() {
      this.$store.commit("setNormalCount", 1000);
    },
    testMuta1() {
      this.$store.commit("setPeoModuleCount", 1001);
    },
    testMuta2() {
      this.setNormalCount(1002);
    },
    testMuta3() {
      this.noModuleMutation(1003);
    },
    testMuta4() {
      this.$store.commit("peopleModule/setPeoModuleCount", 1004);
    },
    testMuta5() {
      this.setWorkModuleCount(1005);
    },
    testMuta6() {
      this.newWorkModuCouSet(1006);
    },
    testMuta7() {
      this.setWorkModuleCount(1007);
    },
    testMuta8() {
      this.createNewWorkModuCouSet(1008);
    },
  },
  computed: {
    /* 非模块,数组格式取state值 */
    ...mapState(["normalCount"]),
    /* 非模块，对象模式取名获取state值 */
    ...mapState({
      newNameCount: "normalCount",
    }),
    // /* 模块，非命名空间取state值 */
    ...mapState({
      peoModuleSta: (state) => state.peopleModule.peoModuleCount,
      workModuleSta: (state) => state.workModule.workModuleCount,
    }),
    // /* 模块，数组格式，命名空间取state值 */
    // ...mapState('workModule',['workModuleCount']),
    // /* 模块，对象格式，命名空间取state值 */
    // ...mapState('workModule',{
    //     'newWorkName':'workModuleCount'
    // })
    /* 模块，借用createNamespaceHelpers */
    // ...mapGetters({
    //     'getPeoModuleCount':'getPeoModuleCount'
    // })
  },
};
</script>
<style lang="less" scoped>
.vuexdata {
  display: inline-block;
  color: orange;
  font-size: 20px;
  font-weight: 700;
}
</style>
