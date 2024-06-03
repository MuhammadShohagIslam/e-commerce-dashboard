import { baseApi } from "../../api/baseApi";

const otpApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        sendOtp: build.mutation({
            query: (payload) => ({
                url: "otp/send-otp",
                method: "POST",
                body: payload,
            }),
        }),
        sendOtpUserVerify: build.mutation({
            query: (payload) => ({
                url: `otp/send-otp-verify-user`,
                method: "POST",
                body: payload,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useSendOtpMutation, useSendOtpUserVerifyMutation } =
    otpApiService;
