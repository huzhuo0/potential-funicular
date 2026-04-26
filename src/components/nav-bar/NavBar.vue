<!--
 * @FilePath: \hz-project\src\components\nav-bar\NavBar.vue
 * @Description: 
-->
<template>
  <div class="home_nav">
    <router-link to="/home" class="pointer navStyle">首页</router-link>
    <router-link to="/font" class="pointer navStyle">字体</router-link>
    <router-link to="/table" class="pointer navStyle">表格</router-link>
    <router-link to="/animation" class="pointer navStyle">动画</router-link>
    <router-link to="/useslot" class="pointer navStyle">插槽</router-link>
    <router-link to="/usevuex" class="pointer navStyle">vuex</router-link>
    <router-link to="/userouter" class="pointer navStyle">router</router-link>
    <router-link to="/useechart" class="pointer navStyle">echarts</router-link>
    <router-link to="/usecard" class="pointer navStyle">card</router-link>
    <router-link to="/bibao" class="pointer navStyle">闭包</router-link>
    <router-link to="/yxyxl" class="pointer navStyle">原型原型链</router-link>
    <router-link to="/map" class="pointer navStyle">地图</router-link>

    <!-- <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="mail"> <a-icon type="mail" />首页 </a-menu-item>
      <a-menu-item key="app"> <a-icon type="appstore" />字体 </a-menu-item>
      <a-sub-menu>
        <template #title><a-icon type="setting" />表格</template>
        <a-menu-item-group title="Item 1">
          <a-menu-item key="setting:1"> Option 1 </a-menu-item>
          <a-menu-item key="setting:2"> Option 2 </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="Item 2">
          <a-menu-item key="setting:3"> Option 3 </a-menu-item>
          <a-menu-item key="setting:4"> Option 4 </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item key="alipay"> 动画 </a-menu-item>
    </a-menu> -->
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.home_nav {
  width: 100%;
  height: 40px;
  .navStyle {
    margin-right: 20px;
  }
  .icon-box {
    a-icon {
      width: 20px;
      height: 20px;
      color: red;
    }
  }
}
</style>
