import { apiSliceAdmin } from "../store/api/apiSliceAdmin";

export const contentApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "contentApi",
  tagTypes: ["Content"],
  endpoints: (builder) => ({
    getClassList: builder.query({
      query: () => ({
        url: "admin/class-list",
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    getSubjectList: builder.query({
      query: () => ({
        url: "admin/subject-list",
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    getChapterList: builder.query({
      query: () => ({
        url: "admin/chapter-list",
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    getVideoChapterList: builder.query({
      query: () => ({
        url: "admin/video-chapter-list",
        method: "GET",
      }),
      providesTags: ["Content"],
    }),

    classCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/class-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Content"],
    }),
    subjectCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/subject-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Content"],
    }),

    videoCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/chapter-video-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Content"],
    }),

    chapterCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/chapter-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Content"],
    }),

    getSubjectListByClassId: builder.query({
      query: (id) => ({
        url: `admin/subject-by-class-id/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Content"],
    }),
    getChapterListBySubjectId: builder.query({
      query: (id) => ({
        url: `admin/chapter-by-subject-id/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Content"],
    }),
  }),
});

export const {
  useGetClassListQuery,
  useClassCreateOrUpdateMutation,
  useGetSubjectListQuery,
  useSubjectCreateOrUpdateMutation,
  useGetChapterListQuery,
  useChapterCreateOrUpdateMutation,
  useGetSubjectListByClassIdQuery,
  useGetVideoChapterListQuery,
  useVideoCreateOrUpdateMutation,
  useGetChapterListBySubjectIdQuery,
  
} = contentApi;
