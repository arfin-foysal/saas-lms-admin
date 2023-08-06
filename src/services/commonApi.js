import { headers } from "../utils/ApiHeaders";
import { apiSliceAdmin } from "../store/api/apiSliceAdmin";

export const commonApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "commonApi",
  tagTypes: ["Common"],
  endpoints: (builder) => ({
    getDivisionList: builder.query({
      query: () => ({
        url: "division-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Common"],
    }),
    getDistrictList: builder.query({
      query: (id) => ({
        url:  `district-list/${id}`,
        method: "GET",
        headers,
      }),
      providesTags: ["Common"],
    }),
    getClientList: builder.query({
      query: () => ({
        url: "client-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Common"],
    }),
    getUpazilaList: builder.query({
      query: (id) => ({
        url: `upazila-list/${id}`,
        method: "GET",
        headers,
      }),
      providesTags: ["Common"],
    }),
    getAreaList: builder.query({
      query: (id) => ({
        url: `area-list/${id}`,
        method: "GET",
        headers,
      }),
      providesTags: ["Common"],
    }),
  }),
});

export const {
  useGetDivisionListQuery,
  useGetDistrictListQuery,
  useGetClientListQuery,
  useGetUpazilaListQuery,
  useGetAreaListQuery,

} = commonApi;
