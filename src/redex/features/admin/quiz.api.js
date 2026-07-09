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
    getAdminQuizzes: builder.query({
      query: ({ page = 1, search = "", book_name = "", is_published = "" } = {}) => {
        let params = `page=${page}`;
        if (search) params += `&search=${encodeURIComponent(search)}`;
        if (book_name) params += `&book_name=${encodeURIComponent(book_name)}`;
        if (is_published !== "") params += `&is_published=${is_published}`;
        return `/api/quizzes/?${params}`;
      },
      providesTags: ["Quizzes"],
    }),
    getAdminQuizStats: builder.query({
      query: () => "/api/quizzes/stats/",
      providesTags: ["Quizzes"],
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
    publishQuiz: builder.mutation({
      query: (id) => ({
        url: `/api/quizzes/${id}/publish/`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => ["Quizzes", { type: "Quiz", id }],
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
  useGetAdminQuizzesQuery,
  useGetAdminQuizStatsQuery,
  useGetAdminQuizDetailsQuery,
  useUpdateQuizMutation,
  usePatchQuizMutation,
  usePublishQuizMutation,
  useDeleteQuizMutation,
} = adminQuizApi;
