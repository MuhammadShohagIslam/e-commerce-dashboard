import React from "react";
import {
    UseFormRegister,
    UseFormHandleSubmit,
    FieldErrors,
} from "react-hook-form";

import RegisterInputGroup from "../../Molecules/Form/RegisterInputGroup";

import { IShippingAddress } from "../../../types/user.type";

interface ShippingAddressFormProps {
    loading: boolean;
    submitShippingAddress: (data: IShippingAddress) => Promise<void>;
    register: UseFormRegister<IShippingAddress>;
    handleSubmit: UseFormHandleSubmit<IShippingAddress, undefined>;
    errors: FieldErrors<IShippingAddress>;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
    loading,
    submitShippingAddress,
    register,
    handleSubmit,
    errors,
}) => {
    return (
        <form
            onSubmit={handleSubmit(submitShippingAddress)}
        >
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"firstName"}
                    labelName={"First Name"}
                    errors={errors.firstName}
                    inputType={"text"}
                    placeholder={"Enter Your First Name"}
                    errorMessage={"First Name Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"lastName"}
                    labelName={"Last Name"}
                    errors={errors.lastName}
                    inputType={"text"}
                    placeholder={"Enter Your Last Name"}
                    errorMessage={"Last Name Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"phoneNumber"}
                    labelName={"Phone Number"}
                    errors={errors.phoneNumber}
                    inputType={"tel"}
                    placeholder={"Enter Your Phone Number"}
                    errorMessage={"Phone Number Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"address1"}
                    labelName={"Address 1"}
                    errors={errors.address1}
                    inputType={"text"}
                    placeholder={"Enter Your Address1"}
                    errorMessage={"Address1 Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"address2"}
                    labelName={"Address 2"}
                    errors={errors.address2}
                    inputType={"text"}
                    placeholder={"Enter Your Address2"}
                    errorMessage={"Address2 Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"country"}
                    labelName={"Country"}
                    errors={errors.country}
                    inputType={"text"}
                    placeholder={"Enter Your Country"}
                    errorMessage={"Country Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"city"}
                    labelName={"City"}
                    errors={errors.city}
                    inputType={"text"}
                    placeholder={"Enter Your City"}
                    errorMessage={"City Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"state"}
                    labelName={"State"}
                    errors={errors.state}
                    inputType={"text"}
                    placeholder={"Enter Your State"}
                    errorMessage={"State Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"postCode"}
                    labelName={"Post Code"}
                    errors={errors.postCode}
                    inputType={"text"}
                    placeholder={"Enter Your Post Code"}
                    errorMessage={"Post Code Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>

            <button
                type="submit"
                className="border-2 px-5 py-2 border-black hover:bg-primary font-semibold hover:text-white rounded-md transition-all duration-500 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary mt-2"
                disabled={loading}
            >
                {loading ? "Saving..." : "Save"}
            </button>
        </form>
    );
};

export default ShippingAddressForm;
