import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa";
import { PiCircleDashedBold } from "react-icons/pi";

import RegisterInputGroup from "../../../../Molecules/Form/RegisterInputGroup";

import { ForgotPasswordFormValues } from "../../../../../types/auth.type";

interface ForgotPasswordFormProps {
    isLoading: boolean;
    handleForgotPassword: (data: ForgotPasswordFormValues) => Promise<void>;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
    handleForgotPassword,
    isLoading,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ForgotPasswordFormValues>();

    return (
        <form onSubmit={handleSubmit(handleForgotPassword)}>
            <div className="relative">
                <RegisterInputGroup
                    register={register}
                    inputName={"otp"}
                    labelName={"OTP"}
                    errorMessage="OTP Is Required!"
                    errors={errors.otp}
                    inputType={"otp"}
                    placeholder={"Please Enter OTP"}
                />
                <div className="relative">
                    <RegisterInputGroup
                        register={register}
                        inputName={"password"}
                        labelName={"Password"}
                        isRequirePattern={true}
                        requirePattern={{
                            required: "Password is required",
                            validate: {
                                minLength: (value) =>
                                    value.length >= 6 ||
                                    "Password should be at least 6 characters long.",
                                lowercaseLetters: (value) =>
                                    (value.match(/[a-z]/g) || []).length >= 3 ||
                                    "Password should contain at least 3 lowercase letters.",
                                uppercaseLetter: (value) =>
                                    (value.match(/[A-Z]/g) || []).length >= 1 ||
                                    "Password should contain at least 1 uppercase letter.",
                                numericDigit: (value) =>
                                    (value.match(/[0-9]/g) || []).length >= 1 ||
                                    "Password should contain at least 1 numeric digit.",
                                symbol: (value) =>
                                    (value.match(/[^a-zA-Z0-9]/g) || [])
                                        .length >= 1 ||
                                    "Password should contain at least 1 symbol.",
                            },
                        }}
                        errors={errors.password}
                        inputType={!showPassword ? "password" : "text"}
                        placeholder={"Please Enter Your Password"}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-[55%]"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <AiFillEye
                                className={`w-6 h-6 text-primaryBlack`}
                            />
                        ) : (
                            <FaRegEyeSlash
                                className={`w-6 h-6 text-primaryBlack`}
                            />
                        )}
                    </button>
                </div>
                {errors?.password?.message &&
                    !errors?.password?.message.includes(
                        "Password is required"
                    ) && (
                        <p className="text-sm text-rose-500 font-medium">
                            {errors.password.message}
                        </p>
                    )}
            </div>
            <div className="mt-[25px]">
                <button
                    disabled={isLoading}
                    type="submit"
                    className={`border-2 px-5 py-2 border-primary text-white bg-primary hover:opacity-80 font-semibold hover:text-white  rounded-md transition duration-200 disabled:cursor-wait`}
                >
                    {isLoading ? (
                        <PiCircleDashedBold className="mx-auto animate-spin text-2xl" />
                    ) : (
                        "Submit"
                    )}
                </button>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
