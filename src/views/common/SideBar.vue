<template>
  <div class="side-bar">
    <a-menu
      :selectedKeys="[selectedKey]"
      mode="inline"
      theme="light"
      @click="handleMenuClick"
    >
      <template v-if="currentMenu && currentMenu.children">
        <a-menu-item
          v-for="child in currentMenu.children"
          :key="child.path"
          class="custom-menu-item"
        >
          <div class="item-text">{{ child.meta.title }}</div>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { baseRoutes } from "@/router/base-route";

const selectedKey = ref("");
const currentMenu = ref(null);
const menus = ref(baseRoutes);

const route = useRoute();
const router = useRouter();

watch(
  () => route.path,
  (path) => {
    updateSelectedKey(path);
  },
  { immediate: true }
);

function updateSelectedKey(path) {
  if (currentMenu.value && currentMenu.value.children) {
    for (const child of currentMenu.value.children) {
      if (path.startsWith(child.path)) {
        selectedKey.value = child.path;
        return;
      }
    }
  }
}

const handleMenuChange = (menu) => {
  currentMenu.value = menu;
  if (menu && menu.children && menu.children.length > 0) {
    selectedKey.value = menu.children[0].path;
  }
};

const handleMenuClick = ({ key }) => {
  router.push(key);
};

// 暴露方法供父组件调用
defineExpose({
  handleMenuChange,
});
</script>

<style scoped lang="less">
.side-bar {
  width: 216px;
  height: 100%;
  background: #fff;

  .custom-menu-item {
    &:hover {
      cursor: url("~@/assets/img/mousepoint.png") 20 5, pointer !important;
    }
    .item-text {
      cursor: url("~@/assets/img/mousepoint.png") 20 5, pointer !important;
    }
  }
}
</style>
