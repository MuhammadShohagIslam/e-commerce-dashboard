import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/envConfig";
import { getUserInfo } from "../../store/user/users";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: config.baseURL || "/api",
        prepareHeaders: (headers) => {
            const user = getUserInfo();
            if (user && user?.token?.accessToken) {
                headers.set(
                    "authorization",
                    `Bearer ${user?.token?.accessToken}`
                );
                return headers;
            }
        },
    }),
    endpoints: () => ({}),
    tagTypes: [
        "Users",
        "Category",
        "Brand",
        "Size",
        "Color",
        "SubCategory",
        "Product",
        "Coupon",
        "Orders",
        "Dashboard",
        "Admins",
    ],
});
