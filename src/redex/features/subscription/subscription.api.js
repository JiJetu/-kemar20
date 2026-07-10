import { baseApi } from "../../api/base.api";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBillingPlans: builder.query({
      query: () => "/api/billing/plans/",
      providesTags: ["Subscription"],
    }),
    getSubscriptionStatus: builder.query({
      query: () => "/api/billing/subscription/",
      providesTags: ["Subscription"],
    }),
    updateBillingPlan: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/billing/plans/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),
    checkoutPremium: builder.mutation({
      query: () => ({
        url: "/api/billing/checkout/premium/",
        method: "POST",
      }),
      invalidatesTags: ["Subscription", "Profile"],
    }),
    activateFreeTrial: builder.mutation({
      query: () => ({
        url: "/api/billing/free-trial/",
        method: "POST",
      }),
      invalidatesTags: ["Subscription", "Profile"],
    }),
    cancelSubscription: builder.mutation({
      query: () => ({
        url: "/api/billing/cancel/",
        method: "POST",
      }),
      invalidatesTags: ["Subscription", "Profile"],
    }),
  }),
});

export const {
  useGetBillingPlansQuery,
  useGetSubscriptionStatusQuery,
  useUpdateBillingPlanMutation,
  useCheckoutPremiumMutation,
  useActivateFreeTrialMutation,
  useCancelSubscriptionMutation,
} = subscriptionApi;
