import { useEffect } from "react";
import { useForm } from "react-hook-form";

import AntdModal from "../../../Atoms/Modal/AntdModal";

import { getUserInfo } from "../../../../store/user/users";
import { IAddressFormValue } from "../../../../types/auth.type";
import ShippingAddressForm from "../../../Organisms/Form/ShippingAddressForm";

type AddressEditModalProp = {
    title: string;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    showModal: boolean;
    loading: boolean;
    handleAddressEditSubmit: (data: IAddressFormValue) => Promise<void>;
};

const AddressEditModal: React.FC<AddressEditModalProp> = ({
    handleAddressEditSubmit,
    setShowModal,
    title,
    showModal,
    loading,
}) => {
    const user = getUserInfo();
    const address = user?.user?.shippingAddress;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IAddressFormValue>({
        defaultValues: {
            firstName: "",
            lastName: "",
            address1: "",
            address2: "",
            country: "",
            city: "",
            state: "",
            postCode: "",
            phoneNumber: "",
        },
    });

    useEffect(() => {
        if (address) {
            reset({
                firstName: address?.firstName,
                lastName: address?.lastName,
                address1: address?.address1,
                address2: address?.address2,
                country: address?.country,
                city: address?.city,
                state: address?.state,
                postCode: address?.postCode,
                phoneNumber: address?.phoneNumber,
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
                <div className="py-5 px-7 md:h-[400px] overflow-y-scroll ">
                    <ShippingAddressForm
                        loading={loading}
                        submitShippingAddress={handleAddressEditSubmit}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        register={register}
                    />
                </div>
            </AntdModal>
        </>
    );
};

export default AddressEditModal;
