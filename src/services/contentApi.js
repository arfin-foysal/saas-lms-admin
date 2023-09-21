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
      query: ({
        class_id,
        subject_id,
        chapter_id,
      }) => ({
        url: `admin/video-chapter-list?class_id=${class_id}&subject_id=${subject_id}&chapter_id=${chapter_id}`,
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    getScriptChapterList: builder.query({
      query: ({ class_id, subject_id, chapter_id }) => ({
        url: `admin/chapter-script-list?class_id=${class_id}&subject_id=${subject_id}&chapter_id=${chapter_id}`,
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    questionSetList: builder.query({
      query: () => ({
        url: "admin/question-set-list",
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    getQuizList: builder.query({
      query: ({
        class_id,
        subject_id,
        chapter_id,
      }) => ({
        url: `admin/chapter-quiz-list?class_id=${class_id}&subject_id=${subject_id}&chapter_id=${chapter_id}`,
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
    scriptCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/chapter-script-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Content"],
    }),
    quizCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/chapter-quiz-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Content"],
    }),
    questionSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/chapter-quiz-question-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Content"],
    }),

    quizSubjectSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/quiz-subject-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Content"],
    }),

    excelQuestionUpload: builder.mutation({
      query: (body) => {
        return {
          url: `admin/excel-question-upload`,
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
    getQuizDetails: builder.query({
      query: (id) => ({
        url: `admin/quiz-details-by-id/${id}`,
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

    getScriptListByChapterId: builder.query({
      query: (id) => ({
        url: `admin/script-list-by-chapter-id/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Content"],
    }),

    getVideoListByChapterId: builder.query({
      query: (id) => ({
        url: `admin/video-list-by-chapter-id/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Content"],
    }),
    getQuizListByChapterId: builder.query({
      query: (id) => ({
        url: `admin/quiz-list-by-chapter-id/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Content"],
    }),

    getQuestionListByQuiz: builder.query({
      query: (id) => ({
        url: `admin/question-list-by-quiz/${id}`,
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    getQuizSubject: builder.query({
      query: (id) => ({
        url: `admin/chapter-quiz-subject-list/${id}`,
        method: "GET",
      }),
      providesTags: ["Content"],
    }),

    // deleteQuestion: builder.mutation({
    //   query: (body) => ({
    //     url: `admin/delete-question`,
    //     method: "POST",
    //     body: body,
    //   }),
    //   invalidatesTags: ["Content"],
    // }),

    deleteQuestion: builder.mutation({
      query: (body) => {
        return {
          url: `admin/delete-question`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Content"],
    }),
    contentSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/content-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Content"],
    }),
    contentOutlineSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/content-outline-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Content"],
    }),
    writtenQuestionSaveOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/written-question-save-or-update`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Content"],
    }),
    getWrittenQuestion: builder.query({
      query: (id) => ({
        url: `admin/written-question-list/${id}`,
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    getContentList: builder.query({
      query: () => ({
        url: "admin/content-list",
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    getCoreSubjectList: builder.query({
      query: () => ({
        url: "admin/core-subject-list",
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    getContentOutlineByContentId: builder.query({
      query: (id) => ({
        url: `admin/content-outline-list/${id}`,
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    getQuizAssignSubject: builder.query({
      query: (id) => ({
        url: `admin/quiz-assign-subject-list/${id}`,
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    deleteContentOutline: builder.mutation({
      query: (id) => ({
        url: `admin/delete-content-outline/${id}`,
        method: "DELETE",
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
  useGetScriptChapterListQuery,
  useScriptCreateOrUpdateMutation,
  useGetQuizListQuery,
  useQuizCreateOrUpdateMutation,
  useGetQuestionListByQuizQuery,
  useQuestionSaveOrUpdateMutation,

  useQuestionSetListQuery,
  useExcelQuestionUploadMutation,
  useGetScriptListByChapterIdQuery,
  useGetVideoListByChapterIdQuery,
  useGetQuizListByChapterIdQuery,
  useContentSaveOrUpdateMutation,
  useGetContentListQuery,
  useGetContentOutlineByContentIdQuery,
  useContentOutlineSaveOrUpdateMutation,
  useDeleteContentOutlineMutation,
  useGetQuizDetailsQuery,
  useGetQuizSubjectQuery,
  useGetCoreSubjectListQuery,
  useQuizSubjectSaveOrUpdateMutation,
  useGetQuizAssignSubjectQuery,
  useWrittenQuestionSaveOrUpdateMutation,
  useGetWrittenQuestionQuery,
  useDeleteQuestionMutation,
} = contentApi;
