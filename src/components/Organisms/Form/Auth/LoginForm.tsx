import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiFillEye } from "react-icons/ai";
import { PiCircleDashedBold } from "react-icons/pi";
import { FaRegEyeSlash } from "react-icons/fa6";

import RegisterInputGroup from "../../../Molecules/Form/RegisterInputGroup";

import { LoginFormValues } from "../../../../types/auth.type";
import { validEmailCheckRegex } from "../../../../utils/isEmailValidOrPhone";

interface LoginFormProps {
    handleLogin: SubmitHandler<LoginFormValues>;
    isLoading?: boolean;
    setOpenForgotPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({
    handleLogin,
    isLoading = false,
    setOpenForgotPasswordModal,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginFormValues>();

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
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

            <div className="my-[25px]">
                <div className="flex justify-end -mb-6 relative z-[9999]">
                    <span
                        onClick={() =>
                            setOpenForgotPasswordModal((prev) => !prev)
                        }
                        className="text-[13px] text-right text-primary cursor-pointer"
                    >
                        Forgotten Password?
                    </span>
                </div>
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

                <div className="mt-[25px]">
                    <button
                        disabled={isLoading}
                        type="submit"
                        className={` border-2 px-5 py-2 border-primary text-white bg-primary hover:opacity-80 font-semibold hover:text-white  rounded-md transition duration-200 w-full max-w-[450px] disabled:cursor-wait`}
                    >
                        {isLoading ? (
                            <PiCircleDashedBold className="mx-auto animate-spin text-2xl" />
                        ) : (
                            "Login"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
