<!--
 * @FilePath: \hz-project\src\views\login\Login.vue
 * @Description: 
-->
<template>
  <div class="login-container">
    <div class="login-title">狮子挽歌项目管理系统</div>
    <div class="login-content">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :rules="rules"
        @keyup.enter="login"
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
          <el-button type="primary" @click="login">登录</el-button>
          <!-- <el-button type="primary" @click="toRegister">去注册</el-button> -->
        </div>
        <div class="register-btn"><span @click="toRegister">去注册</span></div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { getLogin } from "@/api/index.js";
import { baseRoutes } from "@/router/base-route.js";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      width: "100%",
      height: window.innerHeight + "px",
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
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(valid, "校验通过");
          this.getLoginData();
        } else {
          return false;
        }
      });
    },
    getLoginData() {
      localStorage.setItem("token", "token-------test");
      let menuList = baseRoutes;
      if (menuList.length) {
        // 提取第一个菜单的路由信息
        const firstMenuPath = menuList[0].path;
        // 进行路由跳转
        this.$router.push(firstMenuPath);
      }

      // let params = {
      //   username: this.form.username,
      //   password: this.form.password,
      // };
      // this.$axios.post("/api/v1/user/login", params).then((res) => {
      //   console.log(res, "res-----------login");
      //   if (res.code == 200) {
      //     this.$message.success("登录成功! ");
      //     localStorage.setItem("token", res.token);
      //     console.log(this.$router, "this.$router");
      //     this.$router.push({
      //       path: "/home",
      //     });
      //   } else {
      //     this.$message.error(res.data.msg);
      //   }
      // });
    },
    toRegister() {
      this.$router.push({
        path: "/register",
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "@/assets/style/mixin.less"; /* 要引入混入的东西（样式） */

.login-container {
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
  .login-title {
    width: 100%;
    height: 40px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
    margin-bottom: 20px;
  }
  .login-content {
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
    .register-btn {
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
