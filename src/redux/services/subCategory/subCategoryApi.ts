import { baseApi } from "../../api/baseApi";

const subCategoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSubCategories: build.query({
            query: (queryParams: string) => ({
                url: `sub-categories?${queryParams}`,
                method: "GET",
            }),
            providesTags: ["SubCategory"],
        }),
        createSubCategory: build.mutation({
            query: (payload) => ({
                url: "sub-categories",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["SubCategory"],
        }),
        updateSubCategory: build.mutation({
            query: ({ payload, id }) => ({
                url: `sub-categories/${id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["SubCategory"],
        }),
        removedSubCategory: build.mutation({
            query: (payload: string) => ({
                url: `sub-categories/${payload}`,
                method: "DELETE",
            }),
            invalidatesTags: ["SubCategory"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateSubCategoryMutation,
    useGetSubCategoriesQuery,
    useRemovedSubCategoryMutation,
    useUpdateSubCategoryMutation,
} = subCategoryApi;
