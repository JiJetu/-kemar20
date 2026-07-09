import { baseApi } from "../../api/base.api";

export const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: (page = 1) => `/api/quizzes/?page=${page}`,
      providesTags: ["Quizzes"],
    }),
    getQuizDetails: builder.query({
      query: (id) => `/api/quizzes/${id}/take/`,
      providesTags: (result, error, id) => [{ type: "Quiz", id }],
    }),
    submitQuiz: builder.mutation({
      query: ({ id, answers }) => ({
        url: `/api/quizzes/${id}/submit/`,
        method: "POST",
        body: { answers },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Quiz", id },
        { type: "QuizResult", id },
        { type: "Leaderboard", id },
        "Quizzes"
      ],
    }),
    getQuizLeaderboard: builder.query({
      query: (id) => `/api/quizzes/${id}/leaderboard/`,
      providesTags: (result, error, id) => [{ type: "Leaderboard", id }],
    }),
    getQuizResult: builder.query({
      query: (id) => `/api/quizzes/${id}/result/`,
      providesTags: (result, error, id) => [{ type: "QuizResult", id }],
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizDetailsQuery,
  useSubmitQuizMutation,
  useGetQuizLeaderboardQuery,
  useGetQuizResultQuery,
} = quizApi;
