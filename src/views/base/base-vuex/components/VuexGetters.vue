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
      vuex中state的使用: 非模块
      {{ $store.getters.getNormalCount }} peopleModule模块
      {{ $store.getters["peopleModule/getPeoModuleCount"] }} workModule模块
      {{ $store.getters["workModule/getWorkModuleCount1"] }}
    </p>
    <div>
      <div>
        <p>非module中的Getters的使用1:</p>
        <p style="margin-left: 50px">
          通过this.$store.getters.getNormalCount eg:<span class="vuexdata">{{
            $store.getters.getNormalCount
          }}</span>
        </p>
      </div>
      <div>
        <p>非module中的Getters的使用2:</p>
        <p style="margin-left: 50px">
          通过mapGetters 使用import {mapGetters} from 'vuex'
          然后在computed中使用...mapGetters
        </p>
        <p style="margin-left: 50px">
          mapGetters方法中可以是一个数组
          computed:{...mapGetters(['getNormalCount'])} eg:<span
            class="vuexdata"
            >{{ getNormalCount }}</span
          >
        </p>
        <p style="margin-left: 50px">
          mapGetters方法中也可以是一个对象，使用对象的时候可以重命名computed:{...mapGetters({'newNameCount':'getNormalCount'})}
          eg:<span class="vuexdata">{{ newNameCount }}</span>
        </p>
      </div>

      <div>
        <p>
          module中的Getters的使用1:
          this.$store.getters[MODULE名称/模块中Getters里的方法名]
          这种是使用了命名空间，如果模块没有使用命名空间，直接this.$store.getters.getPeoModuleCount
          就是getters全局注册了，直接使用就行
        </p>
        <p style="margin-left: 50px">
          通过this.$store.getters[MODULE名称/模块中Getters里的方法名]
          eg:this.$store.getters['peopleModule/getPeoModuleCount']
          <span class="vuexdata">{{
            $store.getters["peopleModule/getPeoModuleCount"]
          }}</span>
        </p>
        <!-- <p>module中的Getters的使用2.1: mapGetters配合命名空间namespace:true</p>
            <p style="margin-left:50px">import {mapGetters} from 'vuex'</p>
            <p style="margin-left:50px">然后在computed中使用： computed:{...mapGetters('模块名',['模块Getters中的变量'])}  eg: ...mapGetters('peopleModule',['peoModuleCount']) <span class="vuexdata">{{workModuleCount}}</span></p>
            <p style="margin-left:50px">仍然可以取名   ...mapGetters('peopleModule',{'peoModuleCount':'peoModuleCount'}) <span class="vuexdata">{{newWorkName}}</span></p>
            <p>module中的Getters的使用2.2: mapGetters配合命名空间namespace:true且通过使用createNamespacedHelpers创建基于某个命名空间辅助函数</p>
            <p style="margin-left:50px">import {createNamespacedHelpers} from 'vuex'</p>
            <p style="margin-left:50px">const {mapGetters} = createNamespacedHelpers('模块名')   eg:const {mapGetters} = createNamespacedHelpers('peopleModule')</p>
            <p style="margin-left:50px">然后在computed中使用： computed:{...mapGetters(['peoModuleCount'])}   </p> -->
      </div>
      <div>
        <p>module中的Getters的使用2: 通过使用mapGetters</p>
        <p style="margin-left: 50px">import {mapGetters} from 'vuex'</p>
        <p style="margin-left: 50px">
          在computed中引入，
          computed:{...mapGetters('模块A',['模块A中的getters中的方法'])}
        </p>
        <p style="margin-left: 50px">
          数组模式：
          computed:{...mapGetters('workModule',['getWorkModuleCount1'])}
          <span class="vuexdata">{{ getWorkModuleCount1 }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import {createNamespaceHelpers} from 'vuex'
// const {mapGetters} = createNamespaceHelpers('workModule')

export default {
  name: "VuexGetters",
  data() {
    return {};
  },
  mounted() {
    // console.log(this.$store,'223')
  },
  // computed:{
  //   /* 非模块,数组格式取Getters值 */
  //   ...mapGetters(['getNormalCount'])
  //   /* 非模块，对象模式取名获取Getters值 */
  //   // ...mapGetters({
  //   //     'newNameCount':'getNormalCount',
  //   // }),
  //   /* 模块，非命名空间取Getters值 */
  //   // ...mapGetters({
  //   //     'peoModuleSta':Getters=>Getters.peoModuleCount,
  //   // }),
  //   /* 模块，数组格式，命名空间取Getters值 */
  //   // ...mapGetters('peopleModule',['getPeoModuleCount']),
  //   /* 模块，对象格式，命名空间取Getters值 */
  //   // ...mapGetters('peopleModule',{
  //   //     'newWorkName':'getPeoModuleCount'
  //   // })
  //   /* 模块，借用createNamespaceHelpers */
  //   // ...mapGetters({
  //   //     'getPeoModuleCount':'getPeoModuleCount'
  //   // })
  // }
};
</script>
<style lang="less" scoped>
.vuexdata {
  display: inline-block;
  color: orange;
  font-size: 28px;
  font-weight: 700;
}
</style>
