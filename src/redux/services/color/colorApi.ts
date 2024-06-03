import { baseApi } from "../../api/baseApi";

const colorApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getColors: build.query({
            query: (queryParams: string) => ({
                url: `colors?${queryParams}`,
                method: "GET",
            }),
            providesTags: ["Color"],
        }),
        createColor: build.mutation({
            query: (payload) => ({
                url: "colors",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Color"],
        }),
        updateColor: build.mutation({
            query: ({ payload, id }) => ({
                url: `colors/${id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["Color"],
        }),
        removedColor: build.mutation({
            query: (payload: string) => ({
                url: `colors/${payload}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Color"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateColorMutation,
    useGetColorsQuery,
    useRemovedColorMutation,
    useUpdateColorMutation,
} = colorApi;
