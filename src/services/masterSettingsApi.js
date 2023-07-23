import { apiSliceAdmin } from "../store/api/apiSliceAdmin";
export const masterSettingsApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "masterSettingsApi",
  tagTypes: ["Master"],
  endpoints: (builder) => ({

    getMenuList: builder.query({
      query: () => ({
        url: "admin/menu-list",
        method: "GET",
      }),
      providesTags: ["Master"],
    }),

    getOrganizationList: builder.query({
      query: () => ({
        url: "organization-list",
        method: "GET",
      }),
      providesTags: ["Master"],
    }),

    menuCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/menu-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Master"],
    }),
    organizationCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/organization-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Master"],
    }),
    settingUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/settings-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Master"],
    }),



  }),
});

export const {
  useMenuCreateOrUpdateMutation,
  useGetMenuListQuery,
  useOrganizationCreateOrUpdateMutation,
  useGetOrganizationListQuery,
  useSettingUpdateMutation,
} = masterSettingsApi;
