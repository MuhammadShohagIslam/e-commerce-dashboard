import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query({
            query: (queryParams: string) => ({
                url: `orders${queryParams ? `?${queryParams}` : ""}`,
                method: "GET",
            }),
            providesTags: ["Orders"],
        }),
        getOrder: build.query({
            query: (query: string) => ({
                url: `orders/${query}`,
                method: "GET",
            }),
            providesTags: ["Orders"],
        }),
        createOrder: build.mutation({
            query: (payload) => ({
                url: "orders",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Orders"],
        }),
        updateOrder: build.mutation({
            query: ({ payload, id }) => ({
                url: `orders/${id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["Orders"],
        }),
        removedOrder: build.mutation({
            query: (payload: string) => ({
                url: `orders/${payload}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Orders"],
        }),
        updateOrderStatus: build.mutation({
            query: (payload) => ({
                url: `orders/order-tracking-status/${payload?.id}`,
                method: "PATCH",
                body: payload?.data,
            }),
            invalidatesTags: ["Orders"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useGetOrderQuery,
    useRemovedOrderMutation,
    useUpdateOrderMutation,
    useUpdateOrderStatusMutation,
} = orderApi;
