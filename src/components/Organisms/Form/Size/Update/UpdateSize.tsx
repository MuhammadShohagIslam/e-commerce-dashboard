import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Paragraph from "../../../../Atoms/Paragraph";
import AntdModal from "../../../../Atoms/Modal/AntdModal";
import FormInputGroup from "../../../../Molecules/Form/FormInputGroup";
import Button from "../../../../Atoms/Button/Button";


import { TUpdateSizeForm } from "./UpdateSize.type";
import { useUpdateSizeMutation } from "../../../../../redux/services/size/sizeApi";
import { CustomFetchBaseQueryError } from "../../../../../types/response";
import { ISize } from "../../../../../types/size.types";

type UpdateSizeFormType = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<
        React.SetStateAction<{
            data: ISize | null;
            open: boolean;
        }>
    >;
    updateData: ISize | null;
};

const UpdateSize = ({
    isModalOpen,
    setIsModalOpen,
    updateData,
}: UpdateSizeFormType) => {
    // state
    const [errorMessage, setErrorMessage] = useState<string>("");

    // redux api call
    const [updateSize, { isLoading }] = useUpdateSizeMutation();

    // react hook form
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<TUpdateSizeForm>({
        defaultValues: {
            name: "",
        },
    });

    // submit handler to submit data to server
    const handleUpdateSize = async (data: TUpdateSizeForm) => {

        const result = await updateSize({
            payload: {...data},
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
                const customError = result.error as CustomFetchBaseQueryError;
                const errorMessage =
                    customError.data?.message || "Failed to Create Size!";
                setErrorMessage(errorMessage);
            } else {
                setErrorMessage("Internal Server Error!");
            }
        }
    };

    // update Size data
    useEffect(() => {
        if (updateData) {
            reset({
                name: updateData?.name,
            });
        }
    }, [updateData, reset]);

    return (
        <AntdModal
            title="Update Size"
            isModalOpen={isModalOpen}
            onCancel={() =>
                setIsModalOpen((prev) => ({
                    ...prev,
                    data: null,
                    open: false,
                }))
            }
        >
            <form
                onSubmit={handleSubmit(handleUpdateSize)}
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
                        label={isLoading ? "Loading" : "Update Size"}
                        type="submit"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </AntdModal>
    );
};

export default UpdateSize;
