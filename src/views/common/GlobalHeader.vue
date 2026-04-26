<template>
  <a-layout id="components-layout-demo-fixed" class="global-header-container">
    <a-layout-header
      :style="{ position: 'fixed', zIndex: 1, width: '100%' }"
      class="layout-header"
    >
      <div class="logo" />
      <div class="nav-items">
        <div
          v-for="item in menuList"
          :key="item.path"
          class="nav-item"
          :class="
            route && route.path && route.path.indexOf(item.path) === 0
              ? 'active'
              : ''
          "
          @click="setSelectedLevel1Menu(item)"
        >
          {{ item.meta.title }}
        </div>
      </div>
    </a-layout-header>
  </a-layout>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { baseRoutes } from "@/router/base-route";

const route = useRoute();
const router = useRouter();

const menuList = ref(baseRoutes);
const currentMenu = ref(null);

const emit = defineEmits(["menu-change"]);

watch(
  () => route.path,
  (path) => {
    updateCurrentMenu(path);
  },
  { immediate: true }
);

function updateCurrentMenu(path) {
  for (const menu of menuList.value) {
    if (path.startsWith(menu.path)) {
      currentMenu.value = menu;
      emit("menu-change", menu);
      return;
    }
  }
}

const setSelectedLevel1Menu = (menu) => {
  currentMenu.value = menu;
  emit("menu-change", menu);
  let submenu = findFirstCanOpenSubMenu([menu]);
  if (submenu) {
    router.push({ path: submenu.path });
  }
};

const findFirstCanOpenSubMenu = (arr) => {
  if (!arr) {
    return null;
  }
  for (let i = 0; i < arr.length; i++) {
    let m = arr[i];
    if (!m.children) {
      return m;
    }
    let find = findFirstCanOpenSubMenu(m.children);
    if (find) {
      return find;
    }
  }
  return null;
};
</script>

<style lang="less" scoped>
.global-header-container {
  .ant-layout-header {
    padding: 0 10px;
  }
  .layout-header {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 50px;
    height: 50px;
    border-radius: 30px;
    background: url("~@/assets/img/lufei.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-right: 10px;
  }
  .nav-items {
    display: flex;
    align-items: center;
    // justify-content: space-between;

    .nav-item {
      height: 64px;
      padding: 0 15px;

      &:hover {
        cursor: pointer;
      }
    }

    .active {
      background-color: rgba(70, 128, 221, 0.75);
      border-bottom: 3px solid #86b9ff;
    }
  }
  .ant-layout-header {
    background: url("~@/assets/images/common/menu.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
    .nav-item {
      cursor: url("~@/assets/img/mousepoint.png") 20 5, pointer !important;
      position: relative;
      right: 5px;
    }
  }
}
</style>
