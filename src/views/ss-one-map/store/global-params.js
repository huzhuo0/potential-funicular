import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useGlobalParamsStore = defineStore('OneMap/GlobalParams', () => {
  const panelShow = ref(true)
  const clickPoint = ref([])
  const activeAction = ref('')
  // const leftPanel$ = ref(null)
  // const rightPanel$ = ref(null);

  // 当前菜单
  const currentMenu = ref(0)
  // const leftPanel$ = ref(null)
  // const rightPanel$ = ref(null);
  function changePanel(val) {
    panelShow.value = val
  }
  function changeCurrentMenu(val) {
    currentMenu.value = val
  }

  function changeClickPoint(val) {
    clickPoint.value = val
  }
  function changeActiveAction(val) {
    activeAction.value = val
  }
  return {
    panelShow,
    changePanel,
    clickPoint,
    activeAction,
    currentMenu,
    changeCurrentMenu,
    changeClickPoint,
    changeActiveAction
  }
})
