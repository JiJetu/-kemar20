import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setTokens } from "../features/auth/auth.slice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshToken = api.getState().auth.refreshToken;
    if (refreshToken) {
      console.log("Token expired. Attempting automatic refresh...");
      const refreshResult = await baseQuery(
        {
          url: "/api/auth/token/refresh/",
          method: "POST",
          body: { refresh: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult?.data?.access) {
        console.log("Token refreshed successfully.");
        const newAccess = refreshResult.data.access;
        // Dispatch setTokens while preserving existing refresh token and user
        api.dispatch(
          setTokens({
            access: newAccess,
            refresh: refreshToken,
            user: api.getState().auth.user,
          })
        );
        // Retry the original query
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error("Token refresh failed. Logging out...");
        api.dispatch(logout());
        if (
          typeof window !== "undefined" &&
          window.location?.pathname !== "/login"
        ) {
          window.location.replace("/login");
        }
      }
    } else {
      console.warn("No refresh token available. Logging out...");
      api.dispatch(logout());
      if (
        typeof window !== "undefined" &&
        window.location?.pathname !== "/login"
      ) {
        window.location.replace("/login");
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Profile",
    "Subscription",
    "Quizzes",
    "Quiz",
    "Leaderboard",
    "QuizResult",
    "AdminOverview",
    "AdminStudents",
    "AdminStudentDetails",
    "AdminQuestions",
  ],
  endpoints: () => ({}),
});

