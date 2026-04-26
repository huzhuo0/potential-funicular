<template>
  <div>
    <div class="margin-bottom-30">
      <h1>substr()和substring()和slice()用法</h1>
      <div>相同点：</div>
      <div class="padding-left-30">
        三个方法都可以截取字符串，且返回一个新的字符串，原字符串不会被改变
      </div>
      <div>
        不同点：
        <div class="padding-left-30">
          <strong>substr(start,length)</strong
          >方法从start位置开始，截取length个字符
          ，如果超过最末端就到最末端结束。
          <div class="padding-left-30">
            start可以取负值，表示从字符串尾部往头部开始数（从右到左，注意是从1开始，比如-1
            指字符串中最后一个字符），但是截取长度还是从左到右，如果超过最末端就到最末端结束。
            a.substr(-4,2)
            //-4表示从右开始数第4个，就是'6'，然后取2个长度的字符串，就是'67'
          </div>
          <div class="padding-left-30">
            如果length为负值，那么会直接当成0处理，最终返回""。
          </div>
          <div class="padding-left-30">
            如果start或者length为小数，那么会取整数部分。 a.substr(1.2,5.2) //
            => a.substr(1,5)
          </div>
          <div class="padding-left-30">
            如果 start 和 length
            有字符串，那么会先进行parseInt()，如果转换结果为NaN，那么就转换为0，其余情况继续上述规则。
          </div>
        </div>
        <div class="padding-left-30">
          <strong>substring[start,end)</strong
          >方法从start位置开始，截取到end位置，不包括end位置的字符 "[start,end)"
          <div class="padding-left-30">
            如果参数 start 与 stop 相等，那么该方法返回的就是一个空串（即长度为
            0 的字符串）。 hz.substring(1,1) // ""
          </div>
          <div class="padding-left-30">
            如果 start 比 stop 大，那么该方法在提取子串之前会先交换这两个参数。
            hz.substring(2,1) // hz.substring(1,2)
          </div>
          <div class="padding-left-30">
            如果 start 和 stop
            有负数，那么会把该参数自动转为0，然后继续上述规则。
            hz.substring(-2,1) // hz.substring(0,1)
          </div>
          <div class="padding-left-30">
            如果 start 和 stop
            有正小数（负数直接进行第4条），那么会把该参数向下取整，然后继续上述规则。
            hz.substring(1.8,1) // hz.substring(1,1)
          </div>
          <div class="padding-left-30">
            如果 start 和 stop
            有字符串，那么会先进行parseInt()，如果转换结果为NaN，那么就转换为0，其余情况继续上述规则。
            hz.substring('hh',1) // hz.substring(0,1)
          </div>
        </div>
        <div class="padding-left-30">
          <strong>slice[start,end)</strong
          >方法从start位置开始，截取到end位置，不包括end位置的字符 "[start,end)"
          和subtring比较像，区别就是slice支持负数，并且不会交换位置，始终是从start到end，如果该区间不存在，那么返回''。
          <div class="padding-left-30">
            如果start或者end为负值时，定位方式和substr一致，从右往左数，从1开始。
            '0123456789'.slice(1,-1)//起始点从第1（包括）开始，结束点为从右往左数第1个（不包括）
            // "12345678" '0123456789'.slice(1,-4) // "12345"
          </div>
          <div class="padding-left-30">
            如果start到end的顺序始终是从左到右，如果最终start的位置在end的右边，那么返回''
            '0123456789'.slice(2,1)
            //2所在的位置是'2'，1所在的位置是'1'，从2=>1，方向相反，返回为空
            '0123456789'.slice(-2,1)
            //-2所在的位置是'8'，1所在的位置是'1'，从8=>1，方向相反，返回为空
            '0123456789'.slice(-2,-1)//-2所在的位置是'8'，-1所在的位置是'9'，从8=>9，方向正常，返回为'8'
          </div>
          <div class="padding-left-30">3.其他情况和substring处理方式一致</div>
        </div>
      </div>
      <div>
        <div>eg:</div>
        <div class="padding-left-30">
          <div>let str = '0123456789'</div>
          <div>let b = str.substr(2,5) b=23456</div>
          <div>let c = str.substring(2,5) c=234</div>
          <div>let d = str.substring(2,5) d=234</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
onMounted(() => {
  let str = "0123456";
  let b = str.substr(2, 5);
  let c = str.substring(2, 5);
  let d = str.substring(2, 5);
  console.log(b, "b=======");
  console.log(c, "c=======");
  console.log(d, "d=======");
  console.log("0123456789".slice(1, -4), "hh");
});
</script>

<style scoped lang="less">
.padding-left-30 {
  padding-left: 30px;
}
.margin-bottom-30 {
  margin-bottom: 30px;
}
</style>
