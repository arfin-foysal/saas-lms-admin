import { headers } from "../utils/ApiHeaders";
import { apiSliceAdmin } from "../store/api/apiSliceAdmin";

export const userApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "userApi",
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: () => ({
        url: "admin/all-user-list",
        method: "GET",
        headers,
      }),
      providesTags: ["User"],
    }),

    userCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/create-or-update-user`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `admin/delete-user/${id}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation({
      query: (body) => {
        return {
          url: `admin/reset-password`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserListQuery,
  useUserCreateOrUpdateMutation,
  useDeleteUserMutation,
  useResetPasswordMutation,
} = userApi;
