import { baseApi } from "../../api/base.api";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBillingPlans: builder.query({
      query: () => "/api/billing/plans/",
    }),
    getSubscriptionStatus: builder.query({
      query: () => "/api/billing/subscription/",
      providesTags: ["Subscription"],
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
  }),
});

export const {
  useGetBillingPlansQuery,
  useGetSubscriptionStatusQuery,
  useCheckoutPremiumMutation,
  useActivateFreeTrialMutation,
} = subscriptionApi;
