import { apiSliceAdmin } from "../store/api/apiSliceAdmin";
export const resourceApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "resourceApi",
  tagTypes: ["ResData"],
  endpoints: (builder) => ({
    getAllMentor: builder.query({
      query: () => ({
        url: `admin/all-mentor-list-admin`,
        method: "GET",
      }),
      providesTags: ["ResData"],
    }),

    mentorSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/mentor-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["ResData"],
    }),
  }),
});

export const { useGetAllMentorQuery, useMentorSaveOrUpdateMutation } =
  resourceApi;
