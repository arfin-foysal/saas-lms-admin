import { apiSliceAdmin } from "../store/api/apiSliceAdmin";

export const courseApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "courseApi",
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    getCourseList: builder.query({
      query: () => ({
        url: "admin/course-list",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),


    courseCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/course-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Course"],
    }),
    courseOutlineCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/course-outline-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Course"],
    }),
    faqSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/faq-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Course"],
    }),

    getCourseOutlineByCourseId: builder.query({
      query: (id) => ({
        url: `admin/course-outline-list/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    getFaqListbyCourseId: builder.query({
      query: (id) => ({
        url: `admin/faq-list/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    deleteCourseOutline: builder.mutation({
      query: (id) => ({
        url: `admin/delete-course-outline/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `admin/delete-faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),



  }),
});

export const {
  useGetCourseListQuery,
  useCourseCreateOrUpdateMutation,
  useGetCourseOutlineByCourseIdQuery,
  useCourseOutlineCreateOrUpdateMutation,
  useDeleteCourseOutlineMutation,
  useFaqSaveOrUpdateMutation,
  useGetFaqListbyCourseIdQuery,
  useDeleteFaqMutation,
  

  
} = courseApi;
