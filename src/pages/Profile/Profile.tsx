import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import UpdatePasswordForm from "../../components/Organisms/Form/Auth/UpdatePasswordForm";
import ProfileEditModal from "../../components/Molecules/Modal/ProfileEditModal/ProfileEditModal";
import MetaTag from "../../utils/MetaTag";

import {
    getUserInfo,
    removeUserInfo,
    storeUserInfo,
} from "../../store/user/users";
import { CustomFetchBaseQueryError } from "../../types/response";
import { IProfileFormValue } from "../../types/auth.type";
import { useUpdateUserMutation } from "../../redux/services/user/userApi";

const ProfilePage = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const user = getUserInfo();
    const navigate = useNavigate();
    const userInfo = user?.user;

    // redux api call
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const handleProfileEditSubmit = async (data: IProfileFormValue) => {
        const result = await updateUser({
            id: userInfo?._id,
            data: { ...data },
        });

        const updatedUser = {
            ...user?.user,
            ...data,
        };

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            storeUserInfo(
                JSON.stringify({
                    user: updatedUser,
                    token: user?.token,
                })
            );
            toast.success("Profile Update Successfully!");
        } else {
            if ("error" in result && result.error) {
                const customError = result.error as CustomFetchBaseQueryError;
                if (customError.data?.message.includes("jwt expired")) {
                    removeUserInfo();
                    navigate(`/auth/login?redirect=/user`);
                }
            }
            toast.error("Profile Update Failed!");
        }
    };

    return (
        <>
            <MetaTag
                title="Profile"
                description="View and manage your profile on Aladin. Update personal information, review activity, and customize your settings."
            />

            <div>
                <div className="bg-secondary md:px-9 px-3 md:pt-10 pt-6  md:pb-9 pb-5 rounded-lg">
                    <h2 className="text-center font-semibold text-primary text-2xl">
                        My Profile
                    </h2>
                    <div className="mt-3">
                        <div className="grid lg:grid-cols-8 grid-cols-1 ">
                            <div className="col-span-4 p-4 m-0">
                                <div className="relative flex justify-end items-center">
                                    <span
                                        className="text-green-500 text-md hover:text-black transition-all cursor-pointer"
                                        id="my-profile-update-modal"
                                        onClick={() =>
                                            setShowModal((prev) => !prev)
                                        }
                                    >
                                        <BiEdit />
                                    </span>
                                </div>

                                <div>
                                    <ul>
                                        <li>
                                            <p className="text-black text-md font-semibold mb-0">
                                                Name:
                                            </p>
                                            <span className="text-black mt-1 inline-block">
                                                {userInfo?.name}
                                            </span>
                                        </li>
                                        <li className="mt-2">
                                            <p className="text-black mb-0 text-md font-semibold">
                                                Email address:
                                            </p>
                                            <span className="text-black mt-1 inline-block break-all">
                                                {userInfo?.email}
                                            </span>
                                        </li>
                                        <li className="mt-2">
                                            <p className="text-black mb-0 text-md font-semibold">
                                                About
                                            </p>
                                            <span className="text-black mt-1 inline-block">
                                                {userInfo?.about}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 md:w-1/2 w-full px-4">
                            <div className="">
                                <h4 className="text-black text-xl font-semibold text-start mt-4 mb-3">
                                    Update Password
                                </h4>

                                <UpdatePasswordForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <ProfileEditModal
                    isLoading={isLoading}
                    setShowModal={setShowModal}
                    showModal={showModal}
                    handleProfileEditSubmit={handleProfileEditSubmit}
                    title="Profile Information Update"
                />
            )}
        </>
    );
};

export default ProfilePage;
