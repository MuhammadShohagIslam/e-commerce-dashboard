import { baseApi } from "../../api/baseApi";

const adminApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSingleAdmin: build.query({
            query: ({ id }) => ({
                url: `admins/${id}`,
            }),
            providesTags: ["Admins"],
        }),
        getAllAdmins: build.query({
            query: () => ({
                url: `Admins`,
            }),
            providesTags: ["Admins"],
        }),
        updateAdmin: build.mutation({
            query: ({ data, id }) => ({
                url: `admins/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Admins"],
        }),
        deleteAdmin: build.mutation({
            query: ({ data, id }) => ({
                url: `admins/${id}`,
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["Admins"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetSingleAdminQuery,
    useUpdateAdminMutation,
    useGetAllAdminsQuery,
    useDeleteAdminMutation
} = adminApiService;
