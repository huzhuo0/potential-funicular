<!--
 * @FilePath: \hz-project\src\views\login\Register.vue
 * @Description: 
-->
<template>
  <div class="register-container">
    <div class="register-title">狮子挽歌项目管理系统</div>
    <div class="register-content">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :rules="rules"
        @keyup.enter="register"
      >
        <el-col :span="20">
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="密码:" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20" style="position: relative">
          <div style="position: absolute; left: 0">
            <el-form-item label="验证码:">
              <el-input v-model="form.validCode"></el-input>
            </el-form-item>
          </div>
          <div style="position: absolute; right: 0">
            <el-button type="primary">获取验证码</el-button>
          </div>
        </el-col>
        <div class="button-type">
          <el-button type="primary" @click="register">注册</el-button>
          <!-- <el-button type="primary" @click="toLogin">去登录</el-button> -->
        </div>
        <div class="login-btn">
          <span @click="toLogin">已有账号，去登录</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getRegister } from "@/api/index.js";
export default {
  name: "Register",
  components: {},
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
      form: {
        username: "",
        password: "",
        validCode: "",
      },
    };
  },
  mounted() {},
  methods: {
    register() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.getRegisterData();
        } else {
          return false;
        }
      });
    },
    getRegisterData() {
      getRegister({
        username: this.form.username,
        password: this.form.password,
      }).then((res) => {
        if (res.code === 200) {
          this.$message.success("注册成功! ");
        }
      });
    },
    toLogin() {
      this.$router.push({
        path: "/login",
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "@/assets/style/mixin.less"; /* 要引入混入的东西（样式） */

.register-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 350px;
  background: #e6e6e6;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px;
  // position: relative;
  .register-title {
    width: 100%;
    height: 40px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
    margin-bottom: 20px;
  }
  .register-content {
    width: 100%;
    height: calc(100% - 60px);
    position: relative;
    .button-type {
      width: 100%;
      height: 36px;
      display: flex;
      margin-top: 80px;
      justify-content: center;
      position: absolute;
      bottom: 25px;
      padding: 0 40px;
      button {
        width: 100%;
      }
    }
    .login-btn {
      width: 100%;
      color: #0065dd;
      text-align: center;
      position: absolute;
      bottom: 0;
      span {
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
