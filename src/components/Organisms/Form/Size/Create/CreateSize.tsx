import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import FormInputGroup from "../../../../Molecules/Form/FormInputGroup";
import Button from "../../../../Atoms/Button/Button";
import Paragraph from "../../../../Atoms/Paragraph";
import AntdModal from "../../../../Atoms/Modal/AntdModal";

import { TCreateSizeForm } from "./createSize.type";
import { useCreateSizeMutation } from "../../../../../redux/services/size/sizeApi";
import { CustomFetchBaseQueryError } from "../../../../../types/response";

type CreateSizeFormType = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateSize = ({ isModalOpen, setIsModalOpen }: CreateSizeFormType) => {
    // state
    const [errorMessage, setErrorMessage] = useState<string>("");

    // redux api call
    const [createSize, { isLoading }] = useCreateSizeMutation();

    // react hook form
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<TCreateSizeForm>({
        defaultValues: {
            name: "",
        },
    });

    // submit handler to submit data to server
    const handleAddSize = async (data: TCreateSizeForm) => {
        const result = await createSize({ ...data });

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            reset();
            toast.success(result.data.message);
            setErrorMessage("");
            setIsModalOpen((prev) => !prev);
        } else {
            if ("error" in result && result.error) {
                const customError = result.error as CustomFetchBaseQueryError;
                const errorMessage =
                    customError.data?.message || "Failed to create Size";
                setErrorMessage(errorMessage);
            }
        }
    };

    return (
        <AntdModal
            title="Add New Size"
            isModalOpen={isModalOpen}
            onCancel={() => setIsModalOpen((prev) => !prev)}
        >
            <form
                onSubmit={handleSubmit(handleAddSize)}
                className="lg:mt-5 md:mt-0 mt-0  pt-4 pb-7 px-6"
            >
                <div className="grid grid-cols-1">
                    <div>
                        <FormInputGroup
                            register={register}
                            inputName={"name"}
                            labelName={"Size Name"}
                            errors={errors.name}
                            inputType={"text"}
                            placeholder={"Enter Your Size Name"}
                            errorMessage={"Size Name Is Required!"}
                            className={"drop-shadow-md"}
                        />
                    </div>
                </div>

                {errorMessage ? (
                    <div>
                        <Paragraph
                            text={errorMessage}
                            className={
                                "text-red-500 text-sm capitalize font-medium"
                            }
                        />
                    </div>
                ) : (
                    ""
                )}

                <div className="mt-5">
                    <Button
                        className={`text-white py-3 px-4 disabled:cursor-not-allowed hover:shadow-green-500/40 bg-green-500 shadow-green-500/20`}
                        label={isLoading ? "Loading" : "Add Size"}
                        type="submit"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </AntdModal>
    );
};

export default CreateSize;
