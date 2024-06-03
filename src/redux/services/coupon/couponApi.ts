import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCoupons: build.query({
            query: (queryParams: string) => ({
                url: `coupons?${queryParams}`,
                method: "GET",
            }),
            providesTags: ["Coupon"],
        }),
        createCoupon: build.mutation({
            query: (payload) => ({
                url: "coupons",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Coupon"],
        }),
        updateCoupon: build.mutation({
            query: ({ payload, id }) => ({
                url: `coupons/${id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["Coupon"],
        }),
        removedCoupon: build.mutation({
            query: (payload: string) => ({
                url: `coupons/${payload}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Coupon"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateCouponMutation,
    useGetCouponsQuery,
    useRemovedCouponMutation,
    useUpdateCouponMutation,
} = couponApi;
