<template>
  <div>
    <p>vuex中state的使用</p>
    <div>
      <p>
        非module中的state的使用1: 通过this.$store.state.normalCount eg:{{
          $store.state.normalCount
        }}
      </p>
      <p>
        非module中的state的使用2: 通过mapState 使用import 导入mapState
        然后在computed中使用...mapState eg:{{ normalCount }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "VuexModules",
  data() {
    return {};
  },
  computed: {
    ...mapState(["normalCount"]),
  },
};
</script>
<style lang="less" scoped></style>
