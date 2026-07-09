import { baseApi } from "../../api/base.api";

export const adminQuestionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminQuestions: builder.query({
      query: (quizId) => `/api/questions/?quiz=${quizId}`,
      providesTags: ["AdminQuestions"],
    }),
    createAdminQuestion: builder.mutation({
      query: (body) => ({
        url: "/api/questions/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminQuestions", "Quizzes"],
    }),
    updateAdminQuestion: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/questions/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AdminQuestions", "Quizzes"],
    }),
    patchAdminQuestion: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/questions/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["AdminQuestions", "Quizzes"],
    }),
    deleteAdminQuestion: builder.mutation({
      query: (id) => ({
        url: `/api/questions/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminQuestions", "Quizzes"],
    }),
  }),
});

export const {
  useGetAdminQuestionsQuery,
  useCreateAdminQuestionMutation,
  useUpdateAdminQuestionMutation,
  usePatchAdminQuestionMutation,
  useDeleteAdminQuestionMutation,
} = adminQuestionsApi;
