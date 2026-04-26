<template>
  <div class="cockpit-nav-wrapper">
    <div
      class="item"
      :class="{ active: activeIndex == item.value }"
      v-for="(item, index) in cockpitList"
      v-show="index > 0"
      :key="item.value"
      @click="changeMenu(item, index)">
      <img
        v-if="activeIndex != item.value"
        class="ico"
        :src="item.icon"
        alt="" />
      <img v-else class="ico_active" :src="item.iconActive" alt="" />
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, inject } from 'vue'
import { useGlobalParamsStore } from '../../store/global-params.js'
import { useRouter } from 'vue-router'
import { useMapStore } from '../../store/map-store.js'

const globalParamsStore = useGlobalParamsStore()
const mapStore = useMapStore()
const router = useRouter()
const mapOverlayDom = inject('mapOverlayDom')
const initMenu = ref(null)
// 当前激活的菜单索引
const activeIndex = ref(-1)

const props = defineProps({
  cockpitList: {
    type: Array,
    default: () => []
  }
})

// 监听路由变化
watch(
  () => router.currentRoute.value.path,
  () => {
    initCurrentMenu()
  },
  {
    immediate: true
  }
)

watch(
  () => mapStore.schintaOlMapInstance,
  val => {
    if (val && initMenu.value) {
      changeMenu(initMenu.value)
      initMenu.value = ''
    }
  }
)

onMounted(() => {})

// 初始化当前菜单
function initCurrentMenu() {
  const url = new URL(window.location.href)
  props.cockpitList.forEach(item => {
    if (url.href.indexOf(item.path) !== -1) {
      // changeMenu(item)
      initMenu.value = item
      activeIndex.value = item.value
    }
  })
}

/**
 * 切换菜单
 * @param menu 菜单对象
 */
function changeMenu(menu) {
  activeIndex.value = menu.value

  globalParamsStore.changeCurrentMenu(menu.value)
  // 路由跳转
  router.push(`/ss-thematic-map${menu.path}`)
}
function goHome() {
  // console.log('goHome')
  activeIndex.value = 0
  changeMenu(props.cockpitList[0])
}

// 导出方法
defineExpose({ goHome })
</script>

<style lang="less" scoped>
.cockpit-nav-wrapper {
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 23px;

  .item {
    width: 220px;
    height: 26px;
    color: #fff;
    margin-right: 44px;
    background: url('@/views/ss-thematic-map/assets/images/common/menu_bg.png')
      no-repeat;
    background-size: 100% 100%;
    position: relative;
    padding-left: 42px;
    user-select: none;
    cursor: pointer;

    &:last-of-type {
      margin-right: 0;
    }

    .ico {
      width: 23px;
      height: 25px;
      position: absolute;
      left: 12px;
      top: -9px;
    }

    .ico_active {
      width: 25px;
      height: 28px;
      position: absolute;
      left: 12px;
      top: -11px;
    }

    .name {
      font-family: YouSheBiaoTiHei;
      font-size: 20px;
      color: #fff;
      line-height: 26px;
      text-shadow: 0px 2px 2px rgba(62, 77, 114, 0.6);
      margin-top: -8px;
    }

    &.active {
      background: url('@/views/ss-thematic-map/assets/images/common/menu_bg_active.png')
        no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
