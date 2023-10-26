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
    getTagsList: builder.query({
      query: () => ({
        url: "admin/tag-list-admin",
        method: "GET",
      }),
      providesTags: ["Master"],
    }),

    getOrganizationList: builder.query({
      query: () => ({
        url: "admin/organization-list",
        method: "GET",
      }),
      providesTags: ["Master"],
    }),
    getWebsitePageList: builder.query({
      query: (id) => ({
        url:  `admin/website-page-list/${id}`,
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
    tagsCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/tag-save-or-update-admin`,
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
    websitePageSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/website-page-save-or-update`,
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

    tagsDelete: builder.mutation({
      query: (id) => {
        return {
          url: `admin/delete-tag/${id}`,
          method: "DELETE",
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
  useWebsitePageSaveOrUpdateMutation,
  useGetWebsitePageListQuery,
  useGetTagsListQuery,
  useTagsCreateOrUpdateMutation,
  useTagsDeleteMutation
 
} = masterSettingsApi;
