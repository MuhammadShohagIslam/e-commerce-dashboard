import { baseApi } from "../../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDashWidgetInfos: build.query({
            query: () => ({
                url: `dashboards/dash-widget-info`,
            }),
            providesTags: ["Dashboard"],
        }),
    }),
    overrideExisting: false,
});

export const { useGetDashWidgetInfosQuery } = dashboardApi;
