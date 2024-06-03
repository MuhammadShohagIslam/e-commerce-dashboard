import { useForm } from "react-hook-form";
import { useEffect } from "react";

import AntdModal from "../../../Atoms/Modal/AntdModal";
import RegisterInputGroup from "../../Form/RegisterInputGroup";
import Label from "../../../Atoms/Form/Label";
import FormTextAreaGroup from "../../Form/FormTextAreaGroup";

import { getUserInfo } from "../../../../store/user/users";
import { IProfileFormValue } from "../../../../types/auth.type";

type ProfileEditModalProp = {
    title: string;
    isLoading: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    showModal: boolean;
    handleProfileEditSubmit: (data: IProfileFormValue) => Promise<void>;
};

const ProfileEditModal: React.FC<ProfileEditModalProp> = ({
    handleProfileEditSubmit,
    setShowModal,
    title,
    showModal,
    isLoading = false,
}) => {
    const userInfo = getUserInfo();
    const user = userInfo?.user;

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IProfileFormValue>({
        defaultValues: {
            name: "",
            about: "",
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user?.name,
                about: user?.about,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    return (
        <>
            <AntdModal
                isModalOpen={showModal}
                onCancel={() => setShowModal((prev) => !prev)}
                title={title}
            >
                <form
                    className="p-6 space-y-6"
                    onSubmit={handleSubmit(handleProfileEditSubmit)}
                >
                    <div>
                        <RegisterInputGroup
                            register={register}
                            inputName={"name"}
                            labelName={"Full Name"}
                            errorMessage="Please Enter Your Full Name"
                            errors={errors.name}
                            inputType={"text"}
                            placeholder={"Please Enter Your Full Name"}
                        />
                    </div>
                    <div className="my-2">
                        <Label name={"Email"} />
                        <div className="text-sm rounded-lg  ring-0 block w-full pl-3 p-3 placeholder:text-[13px] placeholder-gray-600  border focus:outline-offset-0 focus:outline-0 bg-gray-300 text-primary">
                            {user?.email}
                        </div>
                    </div>
                    <div>
                        <FormTextAreaGroup
                            register={register}
                            inputName={"about"}
                            labelName={"About Us"}
                            errorMessage="Please Enter About Us"
                            errors={errors.about}
                            placeholder={"Please Enter About Us"}
                        />
                    </div>

                    <button
                        type="submit"
                        className="border-2 px-4 py-2 border-primary text-white bg-primary hover:opacity-80 font-semibold hover:text-white  rounded-md transition duration-200 disabled:cursor-wait"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading" : "Submit"}
                    </button>
                </form>
            </AntdModal>
        </>
    );
};

export default ProfileEditModal;
