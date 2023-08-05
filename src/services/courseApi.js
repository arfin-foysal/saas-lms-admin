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

    getMentorList: builder.query({
      query: () => ({
        url: "admin/mentor-list",
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

    getMentorByCourseId: builder.query({
      query: (id) => ({
        url: `admin/course-mentor-assign-list/${id}`,
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


   featureSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/feature-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Course"],
    }),
routineSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/routine-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Course"],
    }),
mentorAssignSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/mentor-assign-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Course"],
    }),
  getFeatureListbyCourseId: builder.query({
      query: (id) => ({
        url: `admin/feature-list/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
  getRoutineListbyCourseId: builder.query({
      query: (id) => ({
        url: `admin/routine-list/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    deleteFeature: builder.mutation({
      query: (id) => ({
        url: `admin/delete-feature/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
    deleteMentorAssign: builder.mutation({
      query: (id) => ({
        url: `admin/delete-mentor-assign/${id}`,
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
  useFeatureSaveOrUpdateMutation,
  useGetFeatureListbyCourseIdQuery,
  useDeleteFeatureMutation,
  useGetRoutineListbyCourseIdQuery,
  useRoutineSaveOrUpdateMutation,
  useGetMentorListQuery, 
  useGetMentorByCourseIdQuery,
  useMentorAssignSaveOrUpdateMutation,
  useDeleteMentorAssignMutation,


  
} = courseApi;
