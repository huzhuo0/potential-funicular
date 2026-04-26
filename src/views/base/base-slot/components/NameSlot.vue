<template>
  <div>
    <p>有时我们需要多个插槽。</p>
    <p>
      对于这样的情况，slot 元素有一个特殊的 attribute：name。这个 attribute
      可以用来定义额外的插槽
    </p>
    <p>注意 v-slot 只能添加在template上</p>
    <slot></slot>
    <slot name="hzw"></slot>
    <slot></slot>
    <slot name="hzww"></slot>
  </div>
</template>

<script>
export default {
  name: "NameSlot",
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped></style>
