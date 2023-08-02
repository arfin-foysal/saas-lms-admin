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

    getCourseOutlineByCourseId: builder.query({
      query: (id) => ({
        url: `admin/course-outline-list/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    // deleteQuestion: builder.mutation({
    //   query: (id) => ({
    //     url: `admin/delete-question/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Course"],
    // }),



  }),
});

export const {
  useGetCourseListQuery,
  useCourseCreateOrUpdateMutation,
  useGetCourseOutlineByCourseIdQuery,
  useCourseOutlineCreateOrUpdateMutation,

  
} = courseApi;
