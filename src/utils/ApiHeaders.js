import Cookies from "js-cookie";
export const headers = {
  Authorization: `Bearer ${Cookies.get("lms_token")}`,
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

