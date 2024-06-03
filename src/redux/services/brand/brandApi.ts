import { baseApi } from "../../api/baseApi";

const brandApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBrands: build.query({
            query: (queryParams: string) => ({
                url: `brands?${queryParams}`,
                method: "GET",
            }),
            providesTags: ["Brand"],
        }),
        createBrand: build.mutation({
            query: (payload) => ({
                url: "brands",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Brand"],
        }),
        updateBrand: build.mutation({
            query: ({ payload, id }) => ({
                url: `brands/${id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["Brand"],
        }),
        removedBrand: build.mutation({
            query: (payload: string) => ({
                url: `brands/${payload}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Brand"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateBrandMutation,
    useGetBrandsQuery,
    useRemovedBrandMutation,
    useUpdateBrandMutation,
} = brandApi;
