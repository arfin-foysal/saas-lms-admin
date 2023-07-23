import { headers } from "../utils/ApiHeaders";
import { apiSliceAdmin } from "../store/api/apiSliceAdmin";

export const commonApi = apiSliceAdmin.injectEndpoints({
  reducerPath: "commonApi",
  tagTypes: ["Common"],
  endpoints: (builder) => ({
    getClientList: builder.query({
      query: () => ({
        url: "client-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Common"],
    }),

  
  }),
});

export const {
  useGetClientListQuery,
} = commonApi;
