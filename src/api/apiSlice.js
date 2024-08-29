// src/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base query with headers preparation
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("X-JWT-TOKEN");
    const apiKey = "test"; // Replace with your actual API key

    if (apiKey) {
      headers.set("X-API-KEY", apiKey);
    }
    if (token) {
      headers.set("X-JWT-TOKEN", token);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["INCFORM"],
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => "/dashboard/departments",
      providesTags: ["INCFORM"],
    }),
    getPrograms: builder.query({
      query: () => "/dashboard/courses",
      providesTags: ["INCFORM"],
    }),
    getRoles: builder.query({
      query: () => "/dashboard/roles",
      providesTags: ["INCFORM"],
    }),

    getSemester: builder.query({
      query: () => "/dashboard/semester",
      providesTags: ["INCFORM"],
    }),

    getInstructor: builder.query({
      query: () => " /dashboard/instructors",
      providesTags: ["INCFORM"],
    }),
    getCourses: builder.query({
      query: () => " /dashboard/courses",
      providesTags: ["INCFORM"],
    }),

    getAllData: builder.query({
      query: ({ departmentID, courseID }) =>
        `/dashboard/get_inc_form_request/${departmentID}/${courseID}`,
      providesTags: ["INCFORM"],
    }),

    getINCRequest: builder.query({
      query: ({ student_unique_id }) =>
        `/dashboard/inc_form_request/student/${student_unique_id}`,
      providesTags: ["INCFORM"],
    }),

    getINCRequestInstructor: builder.query({
      query: ({ instructor_unique_id }) =>
        `/dashboard/inc_form_request/instructor/${instructor_unique_id}`,
      providesTags: ["INCFORM"],
    }),

    getINCRequestHOD: builder.query({
      query: ({ headDepartment_unique_id }) =>
        `/dashboard/inc_form_request/head_department/${headDepartment_unique_id}`,
      providesTags: ["INCFORM"],
    }),
    getINCRequestCashier: builder.query({
      query: () => "dashboard/inc_form_request/cashier",
      providesTags: ["INCFORM"],
    }),

    getINCRequestRegistrar: builder.query({
      query: ({ registrar_unique_id }) =>
        `dashboard/inc_form_request/registrar/${registrar_unique_id}`,
      providesTags: ["INCFORM"],
    }),

    secureData: builder.query({
      query: () => ({
        url: "/secure",
        method: "GET",
      }),
      providesTags: ["INCFORM"], // Use this if you need cache invalidation for secureData
    }),

    //MUTATION

    studentLogin: builder.mutation({
      query: (credentials) => {
        const formData = new FormData();
        for (const key in credentials) {
          formData.append(key, credentials[key]);
        }
        return {
          url: "/login/student",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["INCFORM"],
    }),

    staffLogin: builder.mutation({
      query: (credentials) => {
        const formData = new FormData();
        for (const key in credentials) {
          formData.append(key, credentials[key]);
        }
        return {
          url: "/login/staff",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["INCFORM"],
    }),
    studentSignUp: builder.mutation({
      query: (credentials) => {
        const formData = new FormData();
        for (const key in credentials) {
          formData.append(key, credentials[key]);
        }
        return {
          url: "/signup/student",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["INCFORM"],
    }),

    staffSignUp: builder.mutation({
      query: (credentials) => {
        const formData = new FormData();
        for (const key in credentials) {
          formData.append(key, credentials[key]);
        }

        return {
          url: "/signup/staff",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["INCFORM"],
    }),

    requestINCForm: builder.mutation({
      query: (credentials) => {
        const formData = new FormData();

        for (const key in credentials) {
          if (credentials[key] !== undefined && credentials[key] !== null) {
            formData.append(key, credentials[key].toString());
          }
        }
        return {
          url: "/dashboard/add_inc_form_request",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["INCFORM"],
    }),

    instructorApproveForm: builder.mutation({
      query: ({ inc_unique_number, credentials }) => {
        const formData = new FormData();
        for (const key in credentials) {
          if (credentials[key] !== undefined && credentials[key] !== null) {
            formData.append(key, credentials[key].toString());
          }
        }
        return {
          url: `/dashboard/inc_form_request/update/instructor/${inc_unique_number}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["INCFORM"],
    }),
    cashierApproveForm: builder.mutation({
      query: ({ inc_unique_number, credentials }) => {
        const formData = new FormData();
        for (const key in credentials) {
          if (credentials[key] !== undefined && credentials[key] !== null) {
            formData.append(key, credentials[key].toString());
          }
        }
        return {
          url: `/dashboard/inc_form_request/update/cashier/${inc_unique_number}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["INCFORM"],
    }),

    HODApproveForm: builder.mutation({
      query: ({ inc_unique_number, credentials }) => {
        const formData = new FormData();
        for (const key in credentials) {
          if (credentials[key] !== undefined && credentials[key] !== null) {
            formData.append(key, credentials[key].toString());
          }
        }
        return {
          url: `/dashboard/inc_form_request/update/head_department/${inc_unique_number}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["INCFORM"],
    }),
  }),
});

// Export the hooks for use in components
export const {
  //Query
  useGetDepartmentsQuery,
  useGetProgramsQuery,
  useGetRolesQuery,
  useGetSemesterQuery,
  useGetInstructorQuery,
  useGetCoursesQuery,
  useGetAllDataQuery,
  useGetINCRequestQuery,
  useGetINCRequestInstructorQuery,
  useGetINCRequestHODQuery,
  useGetINCRequestCashierQuery,
  useGetINCRequestRegistrarQuery,

  useSecureDataQuery,
  //Mutation
  useStudentLoginMutation,
  useStaffLoginMutation,
  useStudentSignUpMutation,
  useStaffSignUpMutation,
  useRequestINCFormMutation,
  useInstructorApproveFormMutation,
  useCashierApproveFormMutation,
  useHODApproveFormMutation,
} = apiSlice;
