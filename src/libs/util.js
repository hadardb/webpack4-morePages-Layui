// 与业务有关的工具方法
export const ADD_LOGIN_USER = function(data) {  //登入，保存状态
  console.log(data)
  sessionStorage.setItem("user", JSON.stringify(data));  //添加到sessionStorage
  // sessionStorage.setItem("isLogin",true);
}

export const SIGN_OUT = function(state) {   //退出，删除状态
  sessionStorage.removeItem("user");  //移除sessionStorage
  // sessionStorage.removeItem("isLogin");
}
