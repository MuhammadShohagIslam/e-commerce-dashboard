import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";

import { IUpdatePasswordFormValue } from "../../../../types/auth.type";
import { getUserInfo } from "../../../../store/user/users";
import { useChangePasswordMutation } from "../../../../redux/services/auth/authApiService";

import RegisterInputGroup from "../../../Molecules/Form/RegisterInputGroup";

const UpdatePasswordForm = () => {
    const user = getUserInfo();
    // redux api call
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IUpdatePasswordFormValue>({
        mode: "onChange",
    });

    // update password
    const handlePasswordSubmit: SubmitHandler<
        IUpdatePasswordFormValue
    > = async (data) => {
        const result = await changePassword({
            ...data,
            email: user?.user?.email,
        });

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            toast.success("Password Is Updated!");
            reset();
        } else {
            toast.error("Password Update Failed!");
        }
    };

    return (
        <form onSubmit={handleSubmit(handlePasswordSubmit)}>
            <RegisterInputGroup
                register={register}
                inputName={"newPassword"}
                labelName={"New Password"}
                isRequirePattern={true}
                requirePattern={{
                    required: "Old Password is required",
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
                            (value.match(/[^a-zA-Z0-9]/g) || []).length >= 1 ||
                            "Password should contain at least 1 symbol.",
                    },
                }}
                errors={errors.newPassword}
                inputType={"password"}
                placeholder={"Please Enter Your New Password"}
            />
            <RegisterInputGroup
                register={register}
                inputName={"oldPassword"}
                labelName={"Old Password"}
                isRequirePattern={true}
                requirePattern={{
                    required: "Old Password is required",
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
                            (value.match(/[^a-zA-Z0-9]/g) || []).length >= 1 ||
                            "Password should contain at least 1 symbol.",
                    },
                }}
                errors={errors.oldPassword}
                inputType={"password"}
                placeholder={"Please Enter Your Old Password"}
            />
            <button
                type="submit"
                className="border-2 px-3 py-2 border-primary text-white bg-primary hover:opacity-80 font-semibold hover:text-white  rounded-md transition duration-200  disabled:cursor-wait"
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Update"}
            </button>
        </form>
    );
};

export default UpdatePasswordForm;
