import { createRouter, createWebHistory } from "vue-router";
import { message } from "ant-design-vue";
import Home from "../views/Home.vue";
import Login from "../views/login/Login.vue";
import Register from "../views/login/Register.vue";
import Layout from "@/views/common/GlobalLayout.vue";
import { baseRoutes } from "./base-route";
const baseRoute = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
      title: "登录",
    },
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
      title: "注册",
    },
    component: Register,
  },
  {
    path: "/layout",
    name: "Layout",
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Layout,
  },
  {
    path: "/ss-one-map",
    name: "oneMap",
    meta: {
      title: "一张图",
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/ss-one-map/OneMap.vue"),
  },
];
const routes = baseRoute.concat(baseRoutes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 路由拦截 to表示将要访问的路径，from表示从哪个路径跳转而来，next是一个函数，表示放行
// router.beforeEach((to, from, next) => {
//   // 判断是否需要登录权限
//   if (to.meta.requireAuth) {
//     // 判断是否登录
//     if (localStorage.getItem("token")) {
//       next();
//     } else {
//       // 如果没登录则跳转到登录界面，并携带上一次的路径，方便登录后跳转回来
//       message.warning("请先登录! ");
//       next({
//         path: "/login",
//         query: {
//           redirect: to.fullPath, // 将跳转的路由path作为参数，登录成功后跳转到该路由
//         },
//       });
//     }
//   } else {
//     // 不需要登录权限直接下一步
//     next();
//   }
// });

export default router;
