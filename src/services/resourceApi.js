import { apiSliceAdmin } from "../store/api/apiSliceAdmin";
export const resourceApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "resourceApi",
  tagTypes: ["Resource"],
  endpoints: (builder) => ({
    getAllMentor: builder.query({
      query: () => ({
        url: `admin/all-mentor-list-admin`,
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),
    getAllStudent: builder.query({
      query: () => ({
        url: `admin/all-student-list-admin`,
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),

    mentorSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/mentor-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Resource"],
    }),
    studentSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/student-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Resource"],
    }),
  }),
});

export const { useGetAllMentorQuery, useMentorSaveOrUpdateMutation,
  useGetAllStudentQuery,
  useStudentSaveOrUpdateMutation
} =
  resourceApi;
