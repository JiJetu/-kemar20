import { baseApi } from "../../api/base.api";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOverview: builder.query({
      query: () => "/api/dashboard/overview/",
      providesTags: ["AdminOverview"],
    }),
    getStudents: builder.query({
      query: ({ search = "", plan = "", status = "", classVal = "", page = 1 }) => {
        let url = `/api/auth/students/?page=${page}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (plan) url += `&plan=${encodeURIComponent(plan)}`;
        if (status) url += `&status=${encodeURIComponent(status)}`;
        if (classVal) url += `&class=${encodeURIComponent(classVal)}`;
        return url;
      },
      providesTags: ["AdminStudents"],
    }),
    getStudentDetails: builder.query({
      query: (id) => `/api/auth/students/${id}/`,
      providesTags: (result, error, id) => [{ type: "AdminStudentDetails", id }],
    }),
  }),
});

export const { 
  useGetAdminOverviewQuery,
  useGetStudentsQuery,
  useGetStudentDetailsQuery,
} = adminApi;
