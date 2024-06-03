import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query({
            query: (queryParams: string) => ({
                url: `categories?${queryParams}`,
                method: "GET",
            }),
            providesTags: ["Category"],
        }),
        createCategory: build.mutation({
            query: (payload) => ({
                url: "categories",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Category"],
        }),
        updateCategory: build.mutation({
            query: ({ payload, id }) => ({
                url: `categories/${id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["Category"],
        }),
        removedCategory: build.mutation({
            query: (payload: string) => ({
                url: `categories/${payload}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useRemovedCategoryMutation,
    useUpdateCategoryMutation,
} = categoryApi;
