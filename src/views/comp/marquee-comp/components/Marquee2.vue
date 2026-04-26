<template>
  <div style="width: 300px; white-space: nowrap; border: 1px solid red">
    <div class="text-content">
      <span class="span-text">{{ content }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, nextTick } from "vue";
const props = defineProps({
  content: String,
  default: "天不生我老夫子，剑道万古如长夜",
});

onMounted(() => {
  nextTick(() => {
    initData();
  });
});

watch(
  () => props.content,
  () => {
    nextTick(() => {
      initData();
    });
  }
);

function initData() {
  const textContent = document.querySelector(".text-content");
  if (!textContent) return;
  const containerWidth = textContent.parentNode.offsetWidth;
  const spanElement = textContent.querySelector("span");
  if (!spanElement) return;
  const spanWidth = spanElement.offsetWidth;

  // 动画时长
  const duration = (spanWidth + containerWidth) / 50;

  // 动态生成唯一动画名
  const animationName = `marquee_${Date.now()}`;
  // 删除旧的 keyframes
  const oldStyle = document.getElementById("marquee-keyframes");
  if (oldStyle) oldStyle.remove();

  // 动态插入 keyframes
  const styleSheet = document.createElement("style");
  styleSheet.id = "marquee-keyframes";
  styleSheet.innerHTML = `
    @keyframes ${animationName} {
      0% { transform: translateX(${containerWidth}px);}
      100% { transform: translateX(-${spanWidth}px);}
    }
  `;
  document.head.appendChild(styleSheet);

  // 设置动画
  spanElement.style.animation = `${animationName} ${duration}s linear infinite`;
  spanElement.style.transform = `translateX(0)`;
}
</script>

<style scoped lang="less">
.span-text {
  display: inline-block;
  white-space: nowrap;
}
</style>
