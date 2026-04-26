<template>
  <div class="common-panel">
    <div v-if="$slots.leftPanel">
      <!-- 左侧面板 -->
      <transition name="slideLeft" appear>
        <div class="common-left-panel" v-show="panelVisible">
          <div class="slot-content" v-resize="(e) => handleResize(e, 'left')">
            <slot name="leftPanel"></slot>
          </div>
        </div>
      </transition>
      <!-- 左侧面板工具 -->
      <transition name="slideLeft" appear>
        <div
          class="tool-box tool-box-left"
          :class="panelVisible ? '' : 'panel-left-close-animation'"
        >
          <slot name="leftTool"></slot>
        </div>
      </transition>
      <!-- 左侧面板关闭按钮 -->
      <transition name="slideLeft" appear>
        <div
          v-if="showArrow"
          class="close-btn close-btn-left"
          :class="panelVisible ? '' : 'panel-left-close-animation'"
          @click="togglePanel()"
        >
          <span v-if="panelVisible" class="close-btn-icon">{{ "<<" }}</span>
          <span v-else class="close-btn-icon">>></span>
        </div>
      </transition>
    </div>
  </div>

  <div class="common-panel">
    <div v-if="$slots.rightPanel">
      <!-- 右侧面板 -->
      <transition name="slideRight" appear>
        <div class="common-right-panel" v-show="panelVisible">
          <div class="slot-content" v-resize="(e) => handleResize(e, 'right')">
            <slot name="rightPanel"></slot>
          </div>
        </div>
      </transition>
      <!-- 右侧面板工具 -->
      <transition name="slideRight" appear>
        <div
          class="tool-box tool-box-right"
          :class="panelVisible ? '' : 'panel-right-close-animation'"
        >
          <slot name="rightTool"></slot>
        </div>
      </transition>
      <!-- 右侧面板关闭按钮 -->
      <transition name="slideRight" appear>
        <div
          v-if="showArrow"
          class="close-btn close-btn-right"
          :class="panelVisible ? '' : 'panel-right-close-animation'"
          @click="togglePanel()"
        >
          <span v-if="panelVisible" class="close-btn-icon">>></span>
          <span v-else class="close-btn-icon">{{ "<<" }}</span>
        </div>
      </transition>
    </div>
  </div>
  <div class="common-panel">
    <div v-if="$slots.bottomPanel">
      <!-- 底部面板 -->
      <transition name="slideBottom" appear>
        <div class="common-bottom-panel" v-show="panelVisible">
          <div
            class="slot-bottom-content"
            v-resize="(e) => handleResize(e, 'bottom')"
          >
            <slot name="bottomPanel"></slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { vResize } from "@/utils/resize-observer";

const props = defineProps({
  showPanel: {
    type: Boolean,
    default: true,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
  buttonTopPosition: {
    type: String,
    default: "50%",
  },
});

const panelVisible = ref(props.showPanel);

watch(
  () => props.showPanel,
  (newVal) => {
    panelVisible.value = newVal;
  }
);

const togglePanel = () => {
  panelVisible.value = !panelVisible.value;
};

// 设置css变量
const handleResize = ({ width }, type) => {
  document.documentElement.style.setProperty(`--${type}-width`, `${width}px`);
};
</script>

<style lang="less" scoped>
// 使用css变量
@left-width: var(--left-width, 420px);
@right-width: var(--right-width, 420px);
@bottom-width: var(--bottom-width, 1784px);

@top: 78px;
@bottom: 20px;
// 面板与左右两侧的距离
@panel-padding: 6px;

.common-left-panel {
  width: @left-width;
  position: fixed;
  left: @panel-padding;
  top: @top;
  bottom: @bottom;
  overflow-y: auto;
  overflow-x: hidden;
  color: #fff;

  font-size: 24px;
  z-index: 1000;
  pointer-events: none;
}
.tool-box {
  cursor: pointer;
  transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 1000;
}
.tool-box-left {
  position: fixed;
  left: calc(@left-width + 10px);
  top: calc(@top + 20px);
}
.tool-box-right {
  position: fixed;
  right: calc(@right-width + 10px);
  top: @top;
}
.close-btn {
  font-size: 24px;
  cursor: pointer;
  transition: left 1s cubic-bezier(0.23, 1, 0.32, 1),
    right 1s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 1000;
}
.close-btn-left {
  position: fixed;
  background-color: red;
  left: @left-width;
  top: v-bind("buttonTopPosition");
}
.close-btn-right {
  position: fixed;
  background-color: red;
  right: @right-width;
  top: v-bind("buttonTopPosition");
}
.panel-left-close-animation {
  left: 0;
}

.panel-right-close-animation {
  right: 0;
}
.common-right-panel {
  width: @right-width;
  position: fixed;
  right: @panel-padding;
  top: @top;
  bottom: @bottom;
  color: #fff;
  font-size: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1000;
  pointer-events: none;
}
.common-bottom-panel {
  /* width: @bottom-width; */
  width: calc(100% - @left-width - @right-width - 40px);
  height: 252px;
  position: fixed;
  left: calc(@left-width + 20px);
  bottom: @bottom;
  color: #fff;
  background: linear-gradient(90deg, #0a2f50 65%, #12163a 100%);
  font-size: 24px;
  overflow-y: auto;
  z-index: 1000;
  pointer-events: none;
}
.slot-bottom-content {
  width: 100%;
  height: 100%;
  pointer-events: auto;
}
.slot-content {
  width: fit-content;
  height: 100%;
}

/******  面板动画 ******/
@slideAnimationName: cubic-bezier(0.23, 1, 0.32, 1);

.slideLeft-enter-active {
  animation: panelLeft 1s @slideAnimationName;
}

.slideLeft-leave-active {
  animation: panelLeft2 1s @slideAnimationName;
}

.slideRight-enter-active {
  animation: panelRight 1s @slideAnimationName;
}

.slideRight-leave-active {
  animation: panelRight2 1s @slideAnimationName;
}

.slideBottom-enter-active {
  animation: panelBottom 1s @slideAnimationName;
}

.slideBottom-leave-active {
  animation: panelBottom2 1s @slideAnimationName;
}

@keyframes panelLeft {
  0% {
    transform: translateX(calc(-1 * @left-width - @panel-padding));
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes panelLeft2 {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-1 * @left-width - @panel-padding));
  }
}

@keyframes panelRight {
  0% {
    transform: translateX(calc(@right-width + @panel-padding));
  }

  100% {
    transform: translateX(0);
  }
}
@keyframes panelRight2 {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(@right-width + @panel-padding));
  }
}

@keyframes panelBottom {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes panelBottom2 {
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(100%);
  }
}
</style>
