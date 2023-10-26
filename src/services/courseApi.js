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

    getStudentList: builder.query({
      query: () => ({
        url: "admin/student-list",
        method: "GET",
      }),
      providesTags: ["Course", "Resource"],
    }),

    getCourseListForMapping: builder.query({
      query: () => ({
        url: "admin/course-list-for-mapping",
        method: "GET",
      }),
      providesTags: ["Course", "Resource"],
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
    deleteCourseStudentMapping: builder.mutation({
      query: (id) => ({
        url: `admin/course-student-mapping-delete/${id}`,
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
    studentMappingSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/student-mapping-save-or-update`,
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
    getStudentParticipantListByCourseId: builder.query({
      query: (id) => ({
        url: `admin/student-Participant-list-by-course-id/${id}`,
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
    getStudentMappingList: builder.query({
      query: () => ({
        url: "admin/student-mapping-list",
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
    getCourseTypeList: builder.query({
      query: () => ({
        url: "admin/course-type",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    getCompletedClassList: builder.query({
      query: ({ course_id, mentor_id, student_id, from, to }) => ({
        url: "admin/completed-class-list",
        method: "GET",
        params: {
          course_id,
          mentor_id,
          student_id,
          from,
          to,
        },
      }),
      providesTags: ["Course"],
    }),

    getCoursePaymentListByCourseId: builder.query({
      query: (id) => ({
        url: `admin/course-payment-list-by-course-id/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    getEnrollmentList: builder.query({
      query: (id) => ({
        url: `admin/enrollment-list/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    courseFreeEnrollment: builder.mutation({
      query: (body) => {
        return {
          url: `admin/course-free-enrollment`,
          method: "POST",
          body: body,
        };
      },
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
  useGetMentorByCourseIdQuery,
  useMentorAssignSaveOrUpdateMutation,
  useDeleteMentorAssignMutation,
  useStudentMappingSaveOrUpdateMutation,
  useGetStudentMappingListQuery,
  useGetStudentListQuery,
  useGetCourseListForMappingQuery,
  useGetStudentParticipantListByCourseIdQuery,
  useGetMentorListQuery,
  useGetCoursePaymentListByCourseIdQuery,
  useDeleteCourseStudentMappingMutation,
  useGetCourseTypeListQuery,
  useGetEnrollmentListQuery,
  useCourseFreeEnrollmentMutation,
  useGetCompletedClassListQuery,
} = courseApi;
