<template>
  <div
    class="marquee-container overflow-hidden relative"
    :class="containerClass"
  >
    <!-- 跑马灯内容区域 -->
    <div
      ref="marqueeRef"
      class="marquee-content whitespace-nowrap flex items-center"
      :style="contentStyle"
    >
      <!-- 左侧图标（可选） -->
      <i v-if="showIcon" :class="['fa ' + iconClass, 'mr-3']"></i>

      <!-- 主要内容 -->
      <span>{{ content }}</span>

      <!-- 复制内容用于无缝滚动，只在需要循环且内容宽度小于容器宽度时显示 -->
      <span v-if="needDuplicate" class="ml-6">{{ content }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, nextTick } from "vue";

const props = defineProps({
  // 跑马灯内容
  content: {
    type: String,
    required: true,
  },
  // 滚动速度（像素/秒）
  speed: {
    type: Number,
    default: 50,
  },
  // 是否循环滚动
  loop: {
    type: Boolean,
    default: true,
  },
  // 是否显示图标
  showIcon: {
    type: Boolean,
    default: false,
  },
  // 图标类名
  iconClass: {
    type: String,
    default: "fa-bullhorn",
  },
  // 容器样式类
  containerClass: {
    type: String,
    default: "",
  },
  // 内容样式类
  contentClass: {
    type: String,
    default: "",
  },
});

const marqueeRef = ref(null);
let animationId = null;
let startTime = null;
let animationDuration = 0;

// 计算属性：是否需要显示重复内容
const needDuplicate = computed(() => {
  if (!props.loop || !marqueeRef.value) return false;

  const containerWidth = marqueeRef.value.parentElement?.clientWidth || 0;
  const contentWidth = marqueeRef.value.clientWidth;

  // 只有当内容宽度小于容器宽度时才需要重复内容来实现无缝循环
  return contentWidth < containerWidth;
});

// 计算属性：内容样式
const contentStyle = computed(() => {
  const style = {
    "will-change": "transform",
    "animation-play-state": "running",
    "animation-timing-function": "linear",
    "animation-iteration-count": "infinite",
  };

  // 如果不循环，使用过渡动画
  if (!props.loop && marqueeRef.value) {
    const containerWidth = marqueeRef.value.parentElement.clientWidth;
    const contentWidth = marqueeRef.value.clientWidth;
    animationDuration = (contentWidth / props.speed) * 1000; // 毫秒

    style.animation = `marquee-${marqueeRef.value.id} ${animationDuration}ms linear forwards`;
  }

  return style;
});

// 设置初始位置（从右边开始）
const setInitialPosition = () => {
  if (!marqueeRef.value) return;

  const containerWidth = marqueeRef.value.parentElement.clientWidth;
  const contentWidth = marqueeRef.value.clientWidth;

  // 设置初始位置为容器宽度，让文字从右边开始出现
  marqueeRef.value.style.transform = `translateX(${containerWidth}px)`;
};

// 创建关键帧动画（非循环模式）
const createKeyframes = () => {
  if (!marqueeRef.value || props.loop) return;

  const containerWidth = marqueeRef.value.parentElement.clientWidth;
  const contentWidth = marqueeRef.value.clientWidth;
  const moveDistance = containerWidth + contentWidth;

  // 生成唯一的动画名称
  const animationName = `marquee-${marqueeRef.value.id}`;

  // 创建样式元素
  const style = document.createElement("style");
  style.id = `marquee-style-${marqueeRef.value.id}`;
  style.textContent = `
    @keyframes ${animationName} {
      0% { transform: translateX(${containerWidth}px); }
      100% { transform: translateX(-${contentWidth}px); }
    }
  `;
  document.head.appendChild(style);
};

// 循环动画函数
const animateMarquee = (timestamp) => {
  if (!marqueeRef.value || !props.loop) return;

  if (!startTime) startTime = timestamp;

  const containerWidth = marqueeRef.value.parentElement.clientWidth;
  const contentWidth = marqueeRef.value.clientWidth;
  const totalDistance = containerWidth + contentWidth; // 总移动距离
  const progress = (timestamp - startTime) / 1000; // 秒
  const distance = progress * props.speed;

  // 计算当前位置
  const currentPosition = containerWidth - (distance % totalDistance);

  // 检查是否完成一次完整循环
  if (distance >= totalDistance) {
    // 重置起始时间，开始下一次循环
    startTime = timestamp;
  }

  marqueeRef.value.style.transform = `translateX(${currentPosition}px)`;
  animationId = requestAnimationFrame(animateMarquee);
};

onMounted(async () => {
  // 为元素添加唯一ID
  if (!marqueeRef.value.id) {
    marqueeRef.value.id = "marquee-" + Date.now();
  }

  // 等待DOM更新后设置初始位置
  await nextTick();
  setInitialPosition();

  if (props.loop) {
    // 循环模式使用requestAnimationFrame
    animationId = requestAnimationFrame(animateMarquee);
  } else {
    // 非循环模式使用CSS关键帧动画
    createKeyframes();
  }
});

onUnmounted(() => {
  // 清理动画
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  // 移除生成的样式
  const styleElement = document.getElementById(
    `marquee-style-${marqueeRef.value?.id}`
  );
  if (styleElement) {
    document.head.removeChild(styleElement);
  }
});
</script>

<style scoped>
/* 跑马灯容器基本样式 */
.marquee-container {
  @apply w-full bg-gray-50 rounded-md p-2 shadow-sm;
}

/* 跑马灯内容基本样式 */
.marquee-content {
  @apply text-gray-700 text-sm;
}
</style>
