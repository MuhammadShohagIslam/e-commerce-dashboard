import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";

import AddressEditModal from "../../../components/Molecules/Modal/AddressEditModal/AddressEditModal";
import AddressInfos from "../../../components/Organisms/Profile/AddressInfos";

import { useUpdateUserMutation } from "../../../redux/services/user/userApi";
import {
    getUserInfo,
    removeUserInfo,
    storeUserInfo,
} from "../../../store/user/users";
import { IAddressFormValue } from "../../../types/auth.type";
import { CustomFetchBaseQueryError } from "../../../types/response";
import MetaTag from "../../../utils/MetaTag";

const AddressPage = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const navigate = useNavigate();
    const user = getUserInfo();
    const address = user?.user?.shippingAddress;

    const [updateUser, { isLoading }] = useUpdateUserMutation();

    // save address to the database
    const handleAddressEditSubmit = async (data: IAddressFormValue) => {
        if (user && user?.token) {
            const result = await updateUser({
                data: {
                    shippingAddress: { ...data },
                },
                id: user?.user?._id,
            });

            const updatedUser = {
                ...user?.user,
                shippingAddress: { ...data },
            };

            // check if the request was successful
            if ("data" in result && result.data && result.data?.success) {
                storeUserInfo(
                    JSON.stringify({
                        user: updatedUser,
                        token: user?.token,
                    })
                );
                setShowModal((prev) => !prev);
                toast.success("Save Address!");
            } else {
                if ("error" in result && result.error) {
                    const customError =
                        result.error as CustomFetchBaseQueryError;
                    if (customError.data?.message.includes("jwt expired")) {
                        removeUserInfo();
                        navigate(`/auth/login?redirect=/setting/address`);
                    }
                }
                toast.error("Failed To Save Address!");
            }
        } else {
            navigate(`/auth/login?redirect=/setting/address`);
        }
    };
    return (
        <>
            <MetaTag
                title="Address"
                description="Manage your shipping address on Aladin. Edit, update, and save your address details for seamless deliveries."
            />
            <div>
                <div className="bg-secondary px-9 pt-10  pb-9 rounded-lg">
                    <h2 className="text-start font-semibold text-primary text-2xl">
                        My Address
                    </h2>

                    <div className="grid lg:grid-cols-8 grid-cols-1 mt-3">
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
                                <AddressInfos address={address} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <AddressEditModal
                    loading={isLoading}
                    setShowModal={setShowModal}
                    showModal={showModal}
                    title="Address Information Update"
                    handleAddressEditSubmit={handleAddressEditSubmit}
                />
            )}
        </>
    );
};

export default AddressPage;
