import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { logout } from "../../features/authSlice";
// import { logout } from "../../features/authSlice";
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_HOST_URL,
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // console.log('sending refresh token')
    // // send refresh token to get new access token
    // const refreshResult = await baseQuery('/refresh', api, extraOptions)
    // console.log(refreshResult)
    // if (refreshResult?.data) {
    //     const user = api.getState().auth.user
    //     // store the new token
    //     api.dispatch(setCredentials({ ...refreshResult.data, user }))
    //     // retry the original query with new access token
    //     result = await baseQuery(args, api, extraOptions)
    // } else {
    toast.error("Session Expired. Please login again");
    api.dispatch(logout());
    // api.dispatch(logout());

    setTimeout(() => {
      // window.location.href = "/login";
      window.location.reload(false);
    }, 3000);

  
  }

  return result;
};

export const apiSliceAdmin = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Admin"],
  reducerPath: "apiSliceAdmin",

  endpoints: (builder) => ({

  }),
});
