/*
 * @FilePath: \hz-project\src\api\index.js
 * @Description:
 */
import request from "@/axios/index.js";

// 注册接口
export const getRegister = (data) => {
  return request({
    url: "/api/v1/user/register",
    method: "post",
    data,
  });
};

// 登录接口
export const getLogin = (data) => {
  return request({
    url: "/api/v1/user/login",
    method: "post",
    data,
  });
};
