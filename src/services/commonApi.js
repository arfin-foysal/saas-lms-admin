import { headers } from "../utils/ApiHeaders";
import { apiSliceAdmin } from "../store/api/apiSliceAdmin";

export const commonApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "commonApi",
  tagTypes: ["Common"],
  endpoints: (builder) => ({
    deleteLanguage: builder.mutation({
      query: (id) => ({
        url: `admin/delete-language/${id}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: ["Common"],
    }),

    //<-------------------- all country api ------------------------>

    getCounteryList: builder.query({
      query: () => ({
        url: "admin/all-countery-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Common"],
    }),

    counteryCreateOrUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `admin/create-or-update-countery`,
          method: "POST",
          body: body,
          headers,
        };
      },
      invalidatesTags: ["Common"],
    }),
    deleteCountry: builder.mutation({
      query: (id) => ({
        url: `admin/delete-countery/${id}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: ["Common"],
    }),

    dashboardSummery: builder.query({
      query: () => ({
        url: "admin/dashboard-summery",
        method: "GET",
        headers,
      }),
      providesTags: ["Common", "Rent"],
    }),
  }),
});

export const {} = commonApi;
