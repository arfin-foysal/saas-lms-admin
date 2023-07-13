import Cookies from "js-cookie";
export const authUserToken = Cookies.get("lms_token") ? "token" : "";
// const role = JSON.parse(localStorage.getItem("lms_user_role"));
export const authUser = JSON.parse(localStorage.getItem("lms_user_role"))
  ? JSON.parse(localStorage.getItem("lms_user_role"))
  : "";






