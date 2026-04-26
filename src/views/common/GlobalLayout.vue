<template>
  <a-layout class="global-layout">
    <GlobalHeader @menu-change="handleMenuChange" />
    <div class="global-layout-content">
      <div class="side-bar"><SideBar ref="sidebar" /></div>
      <div class="main-content">
        <!-- 使用 router-view 组件，并使用 v-slot 插槽来获取当前路由组件 -->
        <router-view v-slot="{ Component }">
          <!-- 使用 component 组件来渲染当前路由组件 -->
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </a-layout>
</template>

<script setup>
import { ref } from "vue";
import GlobalHeader from "./GlobalHeader";
import SideBar from "./SideBar";

const sidebar = ref(null);

const handleMenuChange = (menu) => {
  sidebar.value.handleMenuChange(menu);
};
</script>

<style scoped lang="less">
.global-layout {
  width: 100%;
  height: 100vh;
  .global-layout-content {
    width: 100%;
    height: calc(100% - 64px);
    display: flex;
    .side-bar {
      width: 216px;
      height: 100%;
    }
    .main-content {
      width: calc(100% - 216px);
      height: 100%;
      padding: 16px;
      // background: #f0f2f5;
      background: #fff;
      overflow: auto;
    }
  }
}
</style>
