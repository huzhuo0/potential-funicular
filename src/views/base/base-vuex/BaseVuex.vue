<template>
  <div class="home" :style="{ width: width, height: height }">
    <div style="margin: 20px; display: flex">
      <el-button @click="changeComp(0)">vuex中state的使用</el-button>
      <el-button @click="changeComp(1)">vuex中mutations的使用</el-button>
      <el-button @click="changeComp(2)">vuex中actions的使用</el-button>
      <el-button @click="changeComp(3)">vuex中getters的使用</el-button>
      <!-- <el-button @click="changeComp(4)">vuex中modules的使用</el-button> -->
    </div>
    <Component :is="showCom"></Component>
  </div>
</template>

<script>
import VuexState from "./components/VuexState.vue";
import VuexMutations from "./components/VuexMutations.vue";
import VuexActions from "./components/VuexActions.vue";
import VuexGetters from "./components/VuexGetters.vue";
export default {
  name: "BaseVuex",
  components: {
    VuexState,
    VuexMutations,
    VuexActions,
    VuexGetters,
  },
  data() {
    return {
      width: "100%",
      height: window.innerHeight + "px",
      showCom: "VuexState",
    };
  },
  methods: {
    changeComp(val) {
      if (val == 0) {
        this.showCom = "VuexState";
      } else if (val == 1) {
        this.showCom = "VuexMutations";
      } else if (val == 2) {
        this.showCom = "VuexActions";
      } else if (val == 3) {
        this.showCom = "VuexGetters";
      }
    },
  },
  computed: {},
};
</script>
<style lang="less" scoped></style>
