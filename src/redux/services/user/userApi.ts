import { baseApi } from "../../api/baseApi";

const userApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSingleUser: build.query({
            query: ({ id }) => ({
                url: `admins/${id}`,
            }),
            providesTags: ["Users"],
        }),
        getAllUsers: build.query({
            query: () => ({
                url: `users`,
            }),
            providesTags: ["Users"],
        }),
        updateUser: build.mutation({
            query: ({ data, id }) => ({
                url: `admins/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Users"],
        }),
        deleteUser: build.mutation({
            query: ({ data, id }) => ({
                url: `users/${id}`,
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["Users"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetSingleUserQuery,
    useUpdateUserMutation,
    useGetAllUsersQuery,
    useDeleteUserMutation
} = userApiService;
