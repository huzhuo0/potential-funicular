<template>
  <div class="common-tree-swapper">
    <div v-show="loading" class="loading">
      <a-spin :spinning="true" />
    </div>
    <div v-show="!loading && tTreeData.length === 0" class="no-data">
      无数据~
    </div>
    <a-input-search
      v-if="hasSearch"
      v-model="searchValue"
      class="select-input"
      placeholder="请输入搜索内容"
      @change="onSearch"
    />
    <a-tree
      show-icon
      class="common-tree"
      :class="{ 'custom-radio': checkableType === 'radio' }"
      :checkable="!!checkableType"
      :checked-keys="checkedKeys"
      :check-strictly="checkableType === 'radio' ? true : checkStrictly"
      :draggable="draggable"
      v-model:expandedKeys="expandedSyncKeys"
      v-model:selectedKeys="selectedKeys"
      :tree-data="tTreeData"
      @select="onSelect"
      @check="onCheck"
      @expand="onExpand"
      @dragenter="onDragEnter"
      @drop="onDrop"
    >
      <!-- <template v-for="(_, name) in $slots" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps" />
        </template> -->
      <template #title="{ title, disabled }">
        <span class="tree-title-box">
          <span
            v-if="title.includes(searchValue)"
            :title="showTip ? title : ''"
            @mouseenter="
              (e) => (showTip = e.target.clientWidth < e.target.scrollWidth)
            "
          >
            <span> {{ title.substr(0, title.indexOf(searchValue)) }}</span>
            <span style="color: #f50">{{ searchValue }}</span>
            <span>{{
              title.substr(title.indexOf(searchValue) + searchValue.length) +
              searchValue +
              "hh"
            }}</span>
          </span>
          <span v-else class="ant-tree-node-selected">{{ title + "hz" }}</span>
          <!-- 右侧操作 -->
          <span v-if="hasTool && !disabled" class="icons">
            <a-dropdown>
              <span class="ant-dropdown-link">
                <!-- <a-icon class="tree-icon" type="more" /> -->
              </span>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="treeEdit({ title, disabled })">
                    编辑
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </span>
        </span>
      </template>
    </a-tree>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
const props = defineProps({
  hasTool: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否需要搜索
   * */
  hasSearch: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否前端搜索（目前只完善了前端搜索）
   * */
  isLocalSearch: {
    type: Boolean,
    default: true,
  },
  /**
   * 加载状态
   * */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否只能选择叶子节点
   * */
  isLeafSelect: {
    type: Boolean,
    default: false,
  },
  /**
   * 默认展开项
   * */
  expandedKeys: {
    type: Array,
    default: () => [],
  },
  /**
   * 默认展开所有
   * */
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  /**
   * @param {'checkbox'|'radio'} 选择框类型
   * */
  checkableType: {
    type: String,
    default: "",
  },
  /**
   * 是否可拖拽
   * */
  draggable: {
    type: Boolean,
    default: false,
  },
  /**
   * 数据
   * */
  treeData: {
    type: Array,
    default: () => [],
  },
  /**
   * 替换 treeNode 中 title,key,children 字段为 treeData 中对应的字段
   * */
  replaceFields: {
    type: Object,
    default() {
      return {
        title: "title",
        key: "key",
        children: "children",
      };
    },
  },
  // 默认选中节点
  defaultKey: {
    type: Array,
    default: () => [],
  },
  /**
   * 是否 只能选中最末端的子节点
   * */
  onlySon: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否 只能选中defaultKey节点
   * */
  onlyKey: {
    type: Boolean,
    default: false,
  },
  /**
   * 父子节点选中状态关联
   * */
  // true : 不关联
  // false: 关联
  checkStrictly: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits([
  "treeEdit",
  "search",
  "select",
  "check",
  "expand",
  "drop",
]);

// State
const showTip = ref(false);
const searchValue = ref("");
const tExpandedKeys = ref([]);
const autoExpandParent = ref(true);
const checkedKeys = ref([]);
const tTreeData = ref([]);
const selectedKeys = ref([]);
let treeDataCache = ref([]);
// Computed
const expandedSyncKeys = computed(() => {
  return tExpandedKeys.value.length > 0 ? tExpandedKeys.value : undefined;
});

// Watchers
watch(
  () => props.treeData,
  (val) => {
    treeDataCache.value = [...val];
    if (val && val.length) {
      tTreeData.value = [...val];
      if (props.defaultExpandAll) {
        tExpandedKeys.value = lookForAllByKey(
          tTreeData.value,
          props.replaceFields.key
        );
      } else {
        tExpandedKeys.value = [...tExpandedKeys.value, ...props.expandedKeys];
      }
    }
  },
  { immediate: true }
);

watch(
  () => props.expandedKeys,
  (val) => {
    tExpandedKeys.value = [...tExpandedKeys.value, ...val];
  },
  { immediate: true }
);

watch(
  () => props.replaceFields,
  (val) => {
    if (val) {
      tTreeData.value = changeFields(tTreeData.value, val, {
        isLeafSelect: props.isLeafSelect,
        onlySon: props.onlySon,
        onlyKey: props.onlyKey,
        defaultKey: props.defaultKey,
      });
    }
  },
  { immediate: true }
);

watch(
  () => props.defaultKey,
  (val) => {
    selectedKeys.value = [...val];
  },
  { immediate: true }
);
function generateList(data) {
  return data.reduce((pre, cur) => {
    const { key, title, children } = cur;
    pre.push({ key, title });
    if (children && children.length > 0) {
      // eslint-disable-next-line
      pre = pre.concat(generateList(children));
    }
    return pre;
  }, []);
}
function findItemToHanlder(data, key, callback) {
  data.forEach((item, index, arr) => {
    if (item.key === key) {
      callback(item, index, arr);
    }
    if (item.children) {
      findItemToHanlder(item.children, key, callback);
    }
  });
}
function changeFields(
  data,
  { title = "title", key = "key", children = "children" },
  { isLeafSelect = false, onlySon = false, onlyKey = false, defaultKey = "" }
) {
  return data.map((item) => {
    let disabled = item.disabled || false;
    if (onlySon) {
      disabled = item[children] && item[children].length > 0;
    }
    // 只有一个可选
    if (onlyKey && defaultKey) {
      // eslint-disable-next-line
      disabled = item[key] === defaultKey[0] ? false : true;
    }
    return {
      ...item,
      isLeaf: !(item[children] && item[children].length > 0),
      disableCheckbox: isLeafSelect
        ? item[children] && item[children].length > 0
        : false,
      title: item[title],
      key: item[key],
      // disabled: onlySon ? item[children] && item[children].length > 0 : false,
      disabled,
      scopedSlots: { title: "title", ...item.scopedSlots },
      children:
        item[children] && item[children].length > 0
          ? changeFields(
              item[children],
              { title, key, children },
              { isLeafSelect, onlySon, onlyKey, defaultKey }
            )
          : [],
    };
  });
}
function lookForAllByKey(data = [], field = "id", arr = []) {
  // eslint-disable-next-line
  for (let item of data) {
    arr.push(item[field]);
    if (item.children && item.children.length)
      lookForAllByKey(item.children, field, arr);
  }
  return arr;
}
// Methods
function treeEdit(record) {
  emit("treeEdit", record);
}

function onSearch(e) {
  const value = e.target.value.trim();
  searchValue.value = e.target.value.trim();
  let newCacheList = JSON.parse(JSON.stringify(treeDataCache.value));
  tTreeData.value = newCacheList
    .map((item) => {
      let newItem = {};
      // 遍历newCacheList
      // 若item的title存在搜索字段，则返回item全部数据，
      // 若不存在搜索字段，则继续搜索 item的 children列表
      if (item.title.indexOf(value) === -1) {
        if (item.children && item.children.length > 0) {
          newItem = item;
          newItem.children = getChildrenKey(value, item.children);
          if (!newItem.children) {
            newItem = null;
          }
        } else {
          newItem = null;
        }
      } else {
        newItem = item;
      }
      return newItem;
    })
    .filter((item, i, self) => item && self.indexOf(item) === i);
}
function getChildrenKey(value, tree) {
  const childrenList = tree
    .map((item) => {
      let newItem;
      // 遍历数组
      // 若item的title存在搜索字段，则返回item全部数据，
      // 若不存在搜索字段，则继续搜索 item的 children列表
      if (item.title) {
        if (item.title.indexOf(value) === -1) {
          if (item.children && item.children.length > 0) {
            newItem = item;
            newItem.children = getChildrenKey(value, item.children);
            if (!newItem.children) {
              newItem = null;
            }
          } else {
            newItem = null;
          }
        } else {
          newItem = item;
        }
      } else {
        newItem = null;
      }
      return newItem;
    })
    .filter((item, i, self) => item && self.indexOf(item) === i);
  return childrenList && childrenList.length > 0 ? childrenList : null;
}
function localSearch(value) {
  const curList = generateList(tTreeData.value);
  const expandedKeys = curList
    .filter((m) => m.title.includes(value))
    .map((m) => m.key);

  // Object.assign({
  //   tExpandedKeys: [...tExpandedKeys.value, ...expandedKeys],
  //   searchValue: value,
  //   autoExpandParent: true
  // })
  tExpandedKeys.value = [...tExpandedKeys.value, ...expandedKeys];
  searchValue.value = value;
  autoExpandParent.value = true;
  emit("search", value);
}

function asyncSearch(value) {
  emit("search", value);
}

function onSelect(keys, event) {
  selectedKeys.value = [event.node.eventKey];
  emit("select", {
    keys,
    eventKey: event.node.eventKey,
    event,
  });
}

function refreshSelectedKeys() {
  selectedKeys.value = [];
}

function onCheck(keys, event) {
  if (props.checkableType === "radio") {
    checkedKeys.value = keys.checked.slice(-1);
  } else {
    checkedKeys.value = keys;
  }
  emit("check", {
    checked: checkedKeys.value,
    event,
  });
}

function onExpand(keys, event) {
  tExpandedKeys.value = keys;
  autoExpandParent.value = false;
  emit("expand", {
    keys,
    event,
  });
}

function onDragEnter(event) {
  tExpandedKeys.value = event.expandedKeys;
}

function onDrop(event) {
  const { eventKey: dropKey, pos: dropPos } = event.node;
  const dragKey = event.dragNode.eventKey;
  const dropPosition =
    event.dropPosition - Number(dropPos.split("-").slice(-1));
  const data = [...tTreeData.value];

  if (dropKey === 0 || dropKey === dropPos) {
    return;
  }

  let dragObj;
  findItemToHanlder(data, dragKey, (item, index, arr) => {
    arr.splice(index, 1);
    dragObj = item;
  });

  if (!event.dropToGap) {
    findItemToHanlder(data, dropKey, (item) => {
      item.children = item.children || [];
      item.children.push(dragObj);
    });
  } else if (
    (event.node.children || []).length > 0 &&
    event.node.expanded &&
    dropPosition === 1
  ) {
    findItemToHanlder(data, dropKey, (item) => {
      item.children = item.children || [];
      item.children.unshift(dragObj);
    });
  } else {
    let ar;
    let i;
    findItemToHanlder(data, dropKey, (item, index, arr) => {
      ar = arr;
      i = index;
    });
    ar.splice(i + (dropPosition === -1 ? 0 : 1), 0, dragObj);
  }
  tTreeData.value = data;

  emit("drop", {
    dragKey,
    dropKey,
    pos: dropPosition === 1 ? "bottom" : dropPosition ? "top" : "center",
    event,
  });
}
</script>

<style lang="less" scoped>
.common-tree-swapper {
  position: relative;
  width: 100%;
  height: 100%;

  .loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.5);
    z-index: 9;
  }
  :deep(.common-tree) {
    width: 100%;
    height: calc(100% - 48px) !important;
    overflow-y: auto;
    overflow-x: hidden;
    :deep(.ant-tree-treenode) {
      width: 100% !important;
    }
  }
  :deep(.ant-tree .ant-tree-treenode) {
    width: 100% !important;
  }
  .no-data {
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%);
    color: rgba(0, 0, 0, 0.7);
  }

  .select-input {
    margin: 8px;
    width: calc(100% - 16px);
  }
}
.custom-radio {
  :deep(.ant-tree-checkbox-inner) {
    border-radius: 16px !important;
  }
  :deep(.ant-tree-checkbox-checked::after) {
    border-radius: 16px !important;
  }
}
:deep(.ant-tree-checkbox-disabled) {
  display: none;
}
:deep(.ant-tree-node-content-wrapper) {
  width: calc(100% - 20px);
}
.tree-title-box {
  display: inline-flex;
  justify-content: space-between;
  width: calc(100% - 30px);
  vertical-align: middle;
  span {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .icons {
    opacity: 0;
    .tree-icon {
      margin: 0 4px;
      transition: all 0.2s;
      color: rgba(0, 0, 0, 0.65);
      &:hover {
        transform: scale(1.15);
        color: #1890ff;
      }
    }
  }
  &:hover .icons {
    opacity: 1;
  }
}
</style>
