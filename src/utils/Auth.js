import Cookies from "js-cookie";
const role = JSON.parse(localStorage.getItem("lms_user_role"));

export const authUser = localStorage.getItem("lms_user_role")
  ? role
  : "";

export const authUserToken = Cookies.get("lms_token") ? "token" : "";




