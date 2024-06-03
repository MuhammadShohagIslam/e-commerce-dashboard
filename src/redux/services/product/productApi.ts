import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: (queryParams: string) => ({
                url: `products?${queryParams}`,
                method: "GET",
            }),
            providesTags: ["Product"],
        }),
        getProduct: build.query({
            query: (query: string) => ({
                url: `products/${query}`,
                method: "GET",
            }),
            providesTags: ["Product"],
        }),
        createProduct: build.mutation({
            query: (payload) => ({
                url: "products",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Product"],
        }),
        updateProduct: build.mutation({
            query: ({ payload, id }) => ({
                url: `products/${id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["Product"],
        }),
        removedProduct: build.mutation({
            query: (payload: string) => ({
                url: `products/${payload}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateProductMutation,
    useGetProductsQuery,
    useGetProductQuery,
    useRemovedProductMutation,
    useUpdateProductMutation,
} = productApi;
