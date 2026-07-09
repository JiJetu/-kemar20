import { baseApi } from "../../api/base.api";
import { logout, setTokens } from "./auth.slice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/api/auth/login/",
        method: "POST",
        body: { email, password },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTokens(data));
        } catch {
          dispatch(logout());
        }
      },
    }),

    signup: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/register/",
        method: "POST",
        body: payload,
      }),
    }),

    verify: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/api/auth/verify/",
        method: "POST",
        body: { email, otp },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data && (data.access || data.accessToken)) {
            dispatch(setTokens(data));
          }
        } catch {}
      },
    }),

    resendOtp: builder.mutation({
      query: ({ email }) => ({
        url: "/api/auth/verify/resend/",
        method: "POST",
        body: { email },
      }),
    }),



    // Forgot password: send OTP
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/api/auth/password/forgot/",
        method: "POST",
        body: { email },
      }),
    }),

    // Reset password
    resetPassword: builder.mutation({
      query: ({ email, otp, new_password }) => ({
        url: "/api/auth/password/reset/",
        method: "POST",
        body: { email, otp, new_password },
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSignupMutation,
  useVerifyMutation,
  useResendOtpMutation,
} = authApi;
