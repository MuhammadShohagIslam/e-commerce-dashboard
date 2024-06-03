import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "../../../../Atoms/Button/Button";
import AntdModal from "../../../../Atoms/Modal/AntdModal";
import FormInputGroup from "../../../../Molecules/Form/FormInputGroup";

import { useCreateCouponMutation } from "../../../../../redux/services/coupon/couponApi";
import { CustomFetchBaseQueryError } from "../../../../../types/response";
import { TCreateCouponForm } from "./CreateCoupon.type";
import DatePicker from "../../../../Molecules/Form/DatePicker";
import RadioInputGroup from "../../../../Molecules/Form/RadioInputGroup";

type CreateCouponFormType = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCoupon = ({
    isModalOpen,
    setIsModalOpen,
}: CreateCouponFormType) => {
    // state

    // redux api call
    const [createCoupon, { isLoading }] = useCreateCouponMutation();

    // react hook form
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        control,
    } = useForm<TCreateCouponForm>({
        defaultValues: {
            code: "",
            discountType: "Percentage"
        },
    });

    // submit handler to submit data to server
    const handleAddCoupon = async (data: TCreateCouponForm) => {
        const result = await createCoupon({ ...data });

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            reset();
            toast.success(result.data.message);
            setIsModalOpen((prev) => !prev);
        } else {
            if ("error" in result && result.error) {
                const customError = result.error as CustomFetchBaseQueryError;
                const errorMessage =
                    customError.data?.message || "Failed to create Coupon";
                toast.error(errorMessage);
            }
        }
    };

    return (
        <AntdModal
            title="Add New Coupon"
            isModalOpen={isModalOpen}
            modalWidth={890}
            isCentered
            onCancel={() => setIsModalOpen((prev) => !prev)}
        >
            <form
                onSubmit={handleSubmit(handleAddCoupon)}
                className="lg:mt-5 md:mt-0 mt-0  pt-4 pb-7 px-6"
            >
                <div className="mb-3">
                    <DatePicker
                        control={control}
                        dateName={"expiresAt"}
                        labelName={"Expires Date"}
                        errors={errors.expiresAt}
                        errorMessage={"Expires Date Is Required!"}
                        className={"drop-shadow-md"}
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

export default CreateCoupon;
