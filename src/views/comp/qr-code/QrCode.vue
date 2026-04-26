<template>
  <div class="qr-code-container">
    <div class="qr-code-content">
      <div class="input-content">
        <a-input v-model:value="inputValue" placeholder="请输入内容"></a-input>
      </div>
      <div>
        <a-button
          type="primary"
          :disabled="!inputValue"
          @click="generateQrCode"
        >
          生成二维码
        </a-button>
      </div>
    </div>
    <div class="eg-text">eg: https://www.baidu.com/</div>
    <div class="qr-code-img">
      <div ref="qrCodeDom"></div>
      <div v-if="qrCode" class="download-btn">
        <a-button type="primary" @click="downLoadQrCode">下载</a-button>
      </div>
      <a id="downloadQrCode"></a>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import QRCode from "qrcodejs2-fix";
const inputValue = ref("https://www.baidu.com/");
const qrCodeDom = ref(null);
const qrCode = ref(null);
onMounted(() => {
  generateQrCode();
});
function generateQrCode() {
  if (qrCode.value) {
    qrCodeDom.value.innerHTML = "";
  }
  qrCode.value = new QRCode(qrCodeDom.value, {
    text: inputValue.value, // 二维码承载信息
    width: 150,
    height: 150,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H, // 容错级别
  });
}
function downLoadQrCode() {
  const nodeList = Array.prototype.slice.call(
    qrCode.value._oDrawing._el.children
  );
  const img = nodeList.find((key) => key.nodeName === "IMG");
  // 获取生成的二维码图片类型
  const imgTyp = img.currentSrc.split(";")[0].split("/")[1];
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  let dataURL = canvas.toDataURL(`image/${imgTyp}`);
  document.getElementById("downloadQrCode").setAttribute("href", dataURL);
  document
    .getElementById("downloadQrCode")
    .setAttribute("download", "查看二维码." + imgTyp);
  document.getElementById("downloadQrCode").click();
}
</script>

<style lang="less" scoped>
.qr-code-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  .qr-code-content {
    display: flex;
    align-items: center;
    .input-content {
      width: 300px;
      margin-right: 10px;
    }
  }
  .eg-text {
    padding: 5px 0;
  }
  .qr-code-img {
    margin-top: 20px;
    display: flex;
    align-items: flex-end;
    .download-btn {
      margin-left: 20px;
    }
  }
}
</style>
