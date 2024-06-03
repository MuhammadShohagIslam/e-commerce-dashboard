import { useForm } from "react-hook-form";
import { PiCircleDashedBold } from "react-icons/pi";

import AntdModal from "../../../Atoms/Modal/AntdModal";
import RegisterInputGroup from "../../../Molecules/Form/RegisterInputGroup";

import { OTPSendFormValues } from "../../../../types/auth.type";

interface OTPSendFormProps {
    isModalOpen: boolean;
    isLoading: boolean;
    otpBtnName: string;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleOtpSend: (data: OTPSendFormValues) => Promise<void>;
}

const OTPSendForm: React.FC<OTPSendFormProps> = ({
    isModalOpen,
    setIsModalOpen,
    handleOtpSend,
    isLoading,
    otpBtnName
}) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<OTPSendFormValues>();

    return (
        <AntdModal
            title={"Send OTP"}
            isModalOpen={isModalOpen}
            modalWidth={490}
            isCentered
            onCancel={() => setIsModalOpen((prev) => !prev)}
        >
            <div className="p-5">
                <form onSubmit={handleSubmit(handleOtpSend)}>
                    <RegisterInputGroup
                        register={register}
                        inputName={"otp"}
                        labelName={"OTP"}
                        errorMessage="OTP Is Required!"
                        errors={errors.otp}
                        inputType={"otp"}
                        placeholder={"Please Enter OTP"}
                    />

                    <div className="mt-[25px]">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className={`border-2 px-5 py-2 border-primary text-white bg-primary hover:opacity-80 font-semibold hover:text-white  rounded-md transition duration-200 disabled:cursor-wait`}
                        >
                            {isLoading ? (
                                <PiCircleDashedBold className="mx-auto animate-spin text-2xl" />
                            ) : (
                                otpBtnName
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AntdModal>
    );
};

export default OTPSendForm;
