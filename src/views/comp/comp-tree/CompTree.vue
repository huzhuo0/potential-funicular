<template>
  <div class="tree-container">
    <div class="tree-content">
      <CommonTree
        ref="commonTreeRef"
        :tree-data="treeData"
        :loading="treeLoading"
        :default-expand-all="true"
        :default-key="[selectedKey]"
        :has-search="true"
        @select="onSelect"
      ></CommonTree>
    </div>
  </div>
</template>

<script setup>
import CommonTree from "@/components/common-tree/CommonTree"; // 全局组件
import { ref, onMounted } from "vue";
import { mockRes } from "./mock-res.js";
import { convertToATreeData, findFirstLeafNode } from "@/utils/util.js";
let treeLoading = ref(false);
let selectedNode = ref({});
let selectedKey = ref("");
let defaultSelectedKeys = ref([]);
let treeData = ref([]);
onMounted(() => {
  let title = "0123456789";
  let b = title.substr(2, 5);
  // let b = title.substr(0, title.indexOf("23"));
  console.log(b, "b===");
  getTreeData();
});

function getTreeData() {
  treeLoading.value = true;
  // 模拟异步获取数据
  let timer = setTimeout(() => {
    treeData.value = convertToATreeData(mockRes.result);
    console.log("treeData", treeData.value);
    let firstLeafNode = findFirstLeafNode(
      treeData.value,
      "baWindSolarComplement-149"
    );
    console.log("firstLeafNode", firstLeafNode);
    if (firstLeafNode.leafNode) {
      selectedNode.value = firstLeafNode.leafNode;
      selectedKey.value = firstLeafNode.leafNode.key;
      defaultSelectedKeys.value = [firstLeafNode.parentNode.key];
    } else {
      selectedNode = {};
    }
    treeLoading.value = false;
    setPosition();
    clearTimeout(timer);
  }, 500);
}
// 设置选中节点位置
function setPosition() {
  /*
  scrollIntoView 方法用于将元素滚动到可见区域。方法的主要参数包括alignToTop、scrollIntoViewOptions等。
      ‌alignToTop‌：这是一个布尔参数，用于指定元素是否对齐到可滚动祖先的顶部。
                 如果设置为true，元素的顶部将对齐到可滚动祖先的可见区域的顶部；
                 如果设置为false，元素的底部将与可滚动祖先的可见区域的底部对齐‌
      ‌scrollIntoViewOptions‌：这是一个对象参数，包含以下属性
                   ‌behavior‌：定义滚动动画的效果。可以设置为auto、smooth或instant。默认值为auto，表示浏览器自动选择滚动方式；smooth表示平滑滚动；instant表示瞬间滚动‌
                   ‌block‌：定义元素在垂直方向上的对齐方式。可以设置为start、center、end或nearest。默认值为nearest，表示元素将对齐到最近的可见区域边缘；
                           start表示元素的顶部对齐到可见区域的顶部；center表示元素在可见区域的垂直中心对齐；end表示元素的底部对齐到可见区域的底部‌
                   ‌inline‌：定义元素在水平方向上的对齐方式。可以设置为start、center、end或nearest。默认值为nearest，表示元素将对齐到最近的可见区域边缘；
  */
  let timer = setTimeout(() => {
    if (document.getElementsByClassName("ant-tree-node-selected").length) {
      document
        .getElementsByClassName("ant-tree-node-selected")[0]
        .scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "start",
        });
    }
    clearTimeout(timer);
  }, 200);
}
// 选择节点
function onSelect(val) {
  const { keys, event } = val;
  const nodeData = event.node.dataRef;
  // 检查是否为叶子节点
  // if (!nodeData.children || nodeData.children.length === 0) {
  //   if (keys.length) {
  //     selectedKeys.value = [nodeData.key]
  //   } else {
  //     selectedKeys.value = []
  //     commonTreeRef.value.refreshSelectedKeys()
  //   }
  emit("nodeClick", nodeData);
  // }
}
</script>
<style lang="less">
.tree-container {
  width: 100%;
  height: 100%;
  .tree-content {
    width: 300px;
    height: 100%;
    // overflow: auto;
    background: #f0f2f5;
    padding: 10px;
  }
}
</style>
