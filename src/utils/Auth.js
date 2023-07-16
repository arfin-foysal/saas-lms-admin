import Cookies from "js-cookie";
const role = JSON.parse(localStorage.getItem("lms_user_role"));
const token= Cookies.get("lms_token");

export const authUserToken = token ? token : "";
export const authUser = role ? role : "";

