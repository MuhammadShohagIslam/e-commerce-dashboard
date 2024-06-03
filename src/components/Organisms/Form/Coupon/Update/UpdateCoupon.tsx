import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import AntdModal from "../../../../Atoms/Modal/AntdModal";
import FormInputGroup from "../../../../Molecules/Form/FormInputGroup";
import Button from "../../../../Atoms/Button/Button";
import AntdDatePicker from "../../../../Molecules/Form/DatePicker";

import { TUpdateCouponForm } from "./UpdateCoupon.type";
import { useUpdateCouponMutation } from "../../../../../redux/services/coupon/couponApi";

import { ICoupon } from "../../../../../types/coupon.types";
import RadioInputGroup from "../../../../Molecules/Form/RadioInputGroup";

type UpdateCouponFormType = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<
        React.SetStateAction<{
            data: ICoupon | null;
            open: boolean;
        }>
    >;
    updateData: ICoupon | null;
};

const UpdateCoupon = ({
    isModalOpen,
    setIsModalOpen,
    updateData,
}: UpdateCouponFormType) => {
    // state
    const [errorMessage, setErrorMessage] = useState<string>("");

    // redux api call
    const [updateCoupon, { isLoading }] = useUpdateCouponMutation();

    // react hook form
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        control,
    } = useForm<TUpdateCouponForm>({
        defaultValues: {
            code: "",
            discountType: "Percentage",
            discountAmount: 0,
        },
    });

    // submit handler to submit data to server
    const handleUpdateCoupon = async (data: TUpdateCouponForm) => {
        const result = await updateCoupon({
            payload: { ...data },
            id: updateData?._id,
        });

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            setErrorMessage("");
            setIsModalOpen((prev) => ({
                ...prev,
                data: null,
                open: false,
            }));
            reset();
            toast.success(result.data.message);
        } else {
            if ("error" in result && result.error) {
                setErrorMessage("Failed to Create Coupon!");
            } else {
                setErrorMessage("Internal Server Error!");
            }
        }
    };

    // update Color data
    useEffect(() => {
        if (updateData) {
            reset({
                code: updateData?.code,
                discountType: updateData?.discountType,
                discountAmount: updateData?.discountAmount
            });
        }
    }, [updateData, reset]);

    return (
        <AntdModal
            title="Add New Coupon"
            isModalOpen={isModalOpen}
            modalWidth={890}
            isCentered
            onCancel={() =>
                setIsModalOpen((prev) => ({
                    ...prev,
                    data: null,
                    open: false,
                }))
            }
        >
            <form
                onSubmit={handleSubmit(handleUpdateCoupon)}
                className="lg:mt-5 md:mt-0 mt-0  pt-4 pb-7 px-6"
            >
                <div className="mb-3">
                    <AntdDatePicker
                        control={control}
                        dateName={"expiresAt"}
                        labelName={"Expires Date"}
                        errors={errors.expiresAt}
                        errorMessage={"Expires Date Is Required!"}
                        className={"drop-shadow-md"}
                        defaultValue={updateData?.expiresAt}
                    />
                </div>
                <div className="grid grid-cols-2 gap-y-2 gap-x-5">
                    <div>
                        <FormInputGroup
                            register={register}
                            inputName={"code"}
                            labelName={"Code"}
                            errors={errors.code}
                            inputType={"text"}
                            placeholder={"Enter Your Coupon Name"}
                            errorMessage={"Coupon Name Is Required!"}
                            className={"drop-shadow-md"}
                        />
                    </div>
                    <div>
                        <FormInputGroup
                            register={register}
                            inputName={"discountAmount"}
                            labelName={"Discount Amount"}
                            errors={errors.discountAmount}
                            inputType={"number"}
                            placeholder={"Enter Discount Amount"}
                            errorMessage={"Discount Amount Is Required!"}
                            className={"drop-shadow-md"}
                        />
                    </div>
                    <div>
                        <RadioInputGroup
                            control={control}
                            radioName={"discountType"}
                            labelName={"Discount Type"}
                            errors={errors.discountType}
                            errorMessage={"Discount Type Is Required!"}
                            radioOptions={["Percentage", "Fixed"]}
                        />
                    </div>
                </div>

                <div className="mt-5">
                    <Button
                        className={`text-white py-3 px-4 disabled:cursor-not-allowed hover:shadow-green-500/40 bg-green-500 shadow-green-500/20`}
                        label={isLoading ? "Loading" : "Add Coupon"}
                        type="submit"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </AntdModal>
    );
};

export default UpdateCoupon;
