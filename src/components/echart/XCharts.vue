<template>
  <div ref="chartContainer" class="x-echarts"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { markRaw, ref, watch, nextTick, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  mergeOptions: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["init", "click", "resize"]);

const chart = ref(null);
const chartContainer = ref(null);

// 更新echart视图
function setOption(option) {
  nextTick().then(() => {
    if (!chart.value) return;
    chart.value.setOption(option);
    chart.value.resize();
  });
}

// 当窗口缩放时，echart动态调整自身大小
const handleWindowResize = () => {
  if (!chart.value) return;
  chart.value.resize();
  emit("resize");
};

watch(
  () => props.options,
  () => {
    setOption(props.options);
  },
  { deep: true, immediate: true }
);

watch(
  () => props.mergeOptions,
  () => {
    setOption(props.mergeOptions);
  },
  { deep: true }
);

onMounted(() => {
  if (chartContainer.value) {
    /* 控制台报错
     dataSample.js:105 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'type')
     Echarts 管理的状态和数据与 Vue 的响应式产生冲突，导致Echarts 无法正常更新而报错。
     解决方案：使用 markRaw 将 echarts 实例标记为原始对象，避免 Vue 对其进行响应式处理。
             即 取消 VUE 的响应式系统观测 Echarts 的变化更新，让Echarts 自动更新
    */
    chart.value = markRaw(echarts.init(chartContainer.value));
    emit("init", chart.value);
    window.addEventListener("resize", handleWindowResize);
    chart.value.on("click", (param) => {
      emit("click", param);
    });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleWindowResize);
  if (chart.value) {
    chart.value.dispose();
  }
  chart.value = null;
});
</script>

<style scoped lang="less">
.x-echarts {
  width: 100%;
  height: 100%;
}
</style>
