import { baseApi } from "../../api/baseApi";

const sizeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSizes: build.query({
            query: (queryParams: string) => ({
                url: `sizes?${queryParams}`,
                method: "GET",
            }),
            providesTags: ["Size"],
        }),
        createSize: build.mutation({
            query: (payload) => ({
                url: "sizes",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Size"],
        }),
        updateSize: build.mutation({
            query: ({ payload, id }) => ({
                url: `sizes/${id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["Size"],
        }),
        removedSize: build.mutation({
            query: (payload: string) => ({
                url: `sizes/${payload}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Size"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateSizeMutation,
    useGetSizesQuery,
    useRemovedSizeMutation,
    useUpdateSizeMutation,
} = sizeApi;
