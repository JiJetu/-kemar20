import { baseApi } from "../../api/base.api";

export const adminQuizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuiz: builder.mutation({
      query: (formData) => ({
        url: "/api/quizzes/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Quizzes"],
    }),
    getAdminQuizDetails: builder.query({
      query: (id) => `/api/quizzes/${id}/`,
      providesTags: (result, error, id) => [{ type: "Quiz", id }],
    }),
    updateQuiz: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/quizzes/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => ["Quizzes", { type: "Quiz", id }],
    }),
    patchQuiz: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/quizzes/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => ["Quizzes", { type: "Quiz", id }],
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/api/quizzes/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quizzes"],
    }),
  }),
});

export const {
  useCreateQuizMutation,
  useGetAdminQuizDetailsQuery,
  useUpdateQuizMutation,
  usePatchQuizMutation,
  useDeleteQuizMutation,
} = adminQuizApi;
