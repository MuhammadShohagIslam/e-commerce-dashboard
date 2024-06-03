import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiFillEye } from "react-icons/ai";
import { PiCircleDashedBold } from "react-icons/pi";
import { FaRegEyeSlash } from "react-icons/fa6";

import RegisterInputGroup from "../../../Molecules/Form/RegisterInputGroup";

import { RegisterFormValues } from "../../../../types/auth.type";
import { validEmailCheckRegex } from "../../../../utils/isEmailValidOrPhone";

interface RegisterFormProps {
    handleRegister: SubmitHandler<RegisterFormValues>;
    isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
    handleRegister,
    isLoading = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<RegisterFormValues>();

    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <RegisterInputGroup
                register={register}
                inputName={"name"}
                labelName={"Name"}
                errorMessage="Name Is Required!"
                errors={errors.name}
                inputType={"text"}
                placeholder={"Please Enter Name"}
            />

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
                        <p className="text-sm text-rose-500 font-medium -mt-2 mb-2">
                            {errors.password.message}
                        </p>
                    )}
                <div className="relative">
                    <RegisterInputGroup
                        register={register}
                        inputName={"confirmPassword"}
                        labelName={"Confirm Password"}
                        isRequirePattern={true}
                        requirePattern={{
                            required: "Confirm Password is required",
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
                        errors={errors.confirmPassword}
                        inputType={!confirmPassword ? "password" : "text"}
                        placeholder={"Please Enter Your Confirm Password"}
                    />

                    <button
                        type="button"
                        className="absolute right-3 top-[55%]"
                        onClick={() => setConfirmPassword((prev) => !prev)}
                    >
                        {confirmPassword ? (
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
                {errors?.confirmPassword?.message &&
                    !errors?.confirmPassword?.message.includes(
                        "Confirm Password is required"
                    ) && (
                    <p className="text-sm text-rose-500 font-medium -mt-1">
                        {errors.confirmPassword.message}
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
                            "Register"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default RegisterForm;
