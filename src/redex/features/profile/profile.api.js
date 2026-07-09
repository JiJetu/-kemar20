import { baseApi } from "../../api/base.api";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/api/auth/me/",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/api/auth/me/update/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    changePassword: builder.mutation({
      query: ({ old_password, new_password, confirm_password }) => ({
        url: "/api/auth/password/change/",
        method: "POST",
        body: { old_password, new_password, confirm_password },
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = profileApi;
