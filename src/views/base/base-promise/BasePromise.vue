<template>
  <div class="base-promise">
    <Codemirror
      v-model:value="code"
      :options="cmOptions"
      @change="handleChange"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Codemirror from "codemirror-editor-vue3";
const code = ref("");
const cmOptions = ref({
  lineNumbers: true,
  mode: "javascript",
});
/* 
promise详解：
   promise是js中处理异步操作的重要工具，他可以解决回调地狱问题，通过.then和.catch实现链式调用。
   promise有三种状态：pending fulfilled rejected , 状态一旦改变不可逆转。 
     .then接收成功和失败的两个回调，  .catch用于捕获错误
   promise.all 等待所有的promise成功 ， promise.race则在任一Promise状态确定时执行
   
promise介绍：
   Promise是异步编程的一种解决方案，它的构造函数是同步执行的，then方法是异步执行的，所以promisie 创建后
   里面的函数会立即执行，构造函数中的resolve和reject只有第一次执行有效，也就是说Promise状态一旦改变就不能再变

Promise的作用：
   Promise主要是用来解决回调地狱的问题，通过使用.then来使得代码成链式调用，方便维护和使用。.then中的回调函数属于异步任务中的微任务
   
Promise的状态： pedding,fulfilled,rejected
*/
onMounted(() => {});
function handleChange(val) {
  console.log(val, "val==");
}
</script>
<style scoped lang="less">
.base-promise {
  width: 100%;
  height: 100%;
}
</style>
