import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PiCircleDashedBold } from "react-icons/pi";

import AntdModal from "../../../../Atoms/Modal/AntdModal";
import RegisterInputGroup from "../../../../Molecules/Form/RegisterInputGroup";
import ForgotPasswordForm from "./ForgotPasswordForm";

import { useForgotPasswordMutation } from "../../../../../redux/services/auth/authApiService";
import { useSendOtpUserVerifyMutation } from "../../../../../redux/services/otp/otpApiService";
import {
    ForgotPasswordFormValues,
    OTPSendForgotPassFormValues,
} from "../../../../../types/auth.type";
import { CustomFetchBaseQueryError } from "../../../../../types/response";
import { validEmailCheckRegex } from "../../../../../utils/isEmailValidOrPhone";

interface OTPSendForgotPassFormProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OTPSendForgotPassForm: React.FC<OTPSendForgotPassFormProps> = ({
    isModalOpen,
    setIsModalOpen,
}) => {
    const [sendOTPData, setSendOTPData] = useState<{
        email: string;
        successfullySendOTP: boolean;
    }>({
        email: "",
        successfullySendOTP: false,
    });
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<OTPSendForgotPassFormValues>();

    const [sendOtpUserVerify, { isLoading: sendOtpUserVerifyLoading }] =
        useSendOtpUserVerifyMutation();
    const [forgotPassword, { isLoading: forgotPasswordLoading }] =
        useForgotPasswordMutation();

    const handleOtpSend = async (data: OTPSendForgotPassFormValues) => {
        const result = await sendOtpUserVerify({ ...data, role: "admin" });

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            if (
                !result?.data?.data.includes(
                    "Failed to Send OTP, Please Contact Their Support Section"
                )
            ) {
                toast.success(result?.data?.data);
                setSendOTPData({
                    email: data?.email,
                    successfullySendOTP: true,
                });
            } else {
                toast.error(result?.data?.data);
            }
        } else {
            if ("error" in result && result.error) {
                const customError = result.error as CustomFetchBaseQueryError;
                if (customError.data?.message) {
                    toast.error(customError.data?.message);
                }
            } else {
                toast.error("Invalid Credentails!. Try Again!");
            }
        }
    };

    const handleForgotPassword = async (data: ForgotPasswordFormValues) => {
        const result = await forgotPassword({
            password: data?.password,
            otp: Number(data?.otp),
            email: sendOTPData?.email,
        });
        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            toast.success(result?.data?.message);
            setIsModalOpen((prev) => !prev)
        } else {
            if ("error" in result && result.error) {
                const customError = result.error as CustomFetchBaseQueryError;
                if (customError.data?.message) {
                    toast.error(customError.data?.message);
                }
            } else {
                toast.error("Invalid Credentials!. Try Again!");
            }
        }
    };

    return (
        <AntdModal
            title={
                sendOTPData?.successfullySendOTP
                    ? "Forgot Password"
                    : "Send OTP"
            }
            isModalOpen={isModalOpen}
            modalWidth={490}
            isCentered
            onCancel={() => setIsModalOpen((prev) => !prev)}
        >
            <div className="p-5">
                {sendOTPData?.successfullySendOTP ? (
                    <ForgotPasswordForm
                        isLoading={forgotPasswordLoading}
                        handleForgotPassword={handleForgotPassword}
                    />
                ) : (
                    <form onSubmit={handleSubmit(handleOtpSend)}>
                        <RegisterInputGroup
                            register={register}
                            inputName={"email"}
                            labelName={"E-Mail"}
                            isRequirePattern={true}
                            requirePattern={{
                                required: "Email is required!",
                                validate: {
                                    validEmail: (value) =>
                                        validEmailCheckRegex(value) ||
                                        "Invalid Email Address",
                                },
                            }}
                            errors={errors.email}
                            inputType={"email"}
                            placeholder={"Please Enter Your Email"}
                        />

                        <div className="mt-[25px]">
                            <button
                                disabled={sendOtpUserVerifyLoading}
                                type="submit"
                                className={`border-2 px-5 py-2 border-primary text-white bg-primary hover:opacity-80 font-semibold hover:text-white  rounded-md transition duration-200 disabled:cursor-wait`}
                            >
                                {sendOtpUserVerifyLoading ? (
                                    <PiCircleDashedBold className="mx-auto animate-spin text-2xl" />
                                ) : (
                                    "Send OTP"
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </AntdModal>
    );
};

export default OTPSendForgotPassForm;
