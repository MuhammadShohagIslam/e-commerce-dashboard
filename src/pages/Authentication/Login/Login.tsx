import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import AuthFormFooter from "../../../components/Molecules/Auth/AuthFormFooter";
import LeftAuth from "../../../components/Molecules/Auth/LeftAuth";
import OTPSendForgotPassForm from "../../../components/Organisms/Form/Auth/ForgotPasswordForm/OTPSendForgotPassForm";
import LoginForm from "../../../components/Organisms/Form/Auth/LoginForm";

import { useLoginMutation } from "../../../redux/services/auth/authApiService";
import { storeUserInfo } from "../../../store/user/users";
import { LoginFormValues } from "../../../types/auth.type";

const Login = () => {
    const [openForgotPasswordModal, setOpenForgotPasswordModal] =
        useState(false);
    const router = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async (data: LoginFormValues) => {
        const result = await login({ ...data });

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            const data = result.data?.data;
            storeUserInfo(
                JSON.stringify({
                    user: data.user,
                    token: data.token,
                })
            );
            router("/");
        } else {
            toast.error("Login Failed!");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="container !w-[69%]">
                <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center">
                    <LeftAuth />
                    <div className="mx-auto w-full max-w-[450px] my-8 py-6 px-7 bg-white/80 shadow-lg rounded-md">
                        <LoginForm
                            handleLogin={handleLogin}
                            setOpenForgotPasswordModal={
                                setOpenForgotPasswordModal
                            }
                            isLoading={isLoading}
                        />
                        <AuthFormFooter
                            href={"/register"}
                            content={[
                                "Don't have an account?",
                                "Create Your Account",
                            ]}
                        />
                    </div>
                </div>
            </div>

            {openForgotPasswordModal && (
                <OTPSendForgotPassForm
                    isModalOpen={openForgotPasswordModal}
                    setIsModalOpen={setOpenForgotPasswordModal}
                />
            )}
        </div>
    );
};

export default Login;
