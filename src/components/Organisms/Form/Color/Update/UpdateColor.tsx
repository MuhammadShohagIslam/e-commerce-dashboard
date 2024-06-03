import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Paragraph from "../../../../Atoms/Paragraph";
import AntdModal from "../../../../Atoms/Modal/AntdModal";
import FormInputGroup from "../../../../Molecules/Form/FormInputGroup";
import Button from "../../../../Atoms/Button/Button";


import { TUpdateColorForm } from "./UpdateColor.type";
import { useUpdateColorMutation } from "../../../../../redux/services/color/colorApi";
import { CustomFetchBaseQueryError } from "../../../../../types/response";
import { IColor } from "../../../../../types/color.types";

type UpdateColorFormType = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<
        React.SetStateAction<{
            data: IColor | null;
            open: boolean;
        }>
    >;
    updateData: IColor | null;
};

const UpdateColor = ({
    isModalOpen,
    setIsModalOpen,
    updateData,
}: UpdateColorFormType) => {
    // state
    const [errorMessage, setErrorMessage] = useState<string>("");

    // redux api call
    const [updateColor, { isLoading }] = useUpdateColorMutation();

    // react hook form
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<TUpdateColorForm>({
        defaultValues: {
            name: "",
        },
    });

    // submit handler to submit data to server
    const handleUpdateColor = async (data: TUpdateColorForm) => {

        const result = await updateColor({
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
                    customError.data?.message || "Failed to Create Color!";
                setErrorMessage(errorMessage);
            } else {
                setErrorMessage("Internal Server Error!");
            }
        }
    };

    // update Color data
    useEffect(() => {
        if (updateData) {
            reset({
                name: updateData?.name,
            });
        }
    }, [updateData, reset]);

    return (
        <AntdModal
            title="Update Color"
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
                onSubmit={handleSubmit(handleUpdateColor)}
                className="lg:mt-5 md:mt-0 mt-0  pt-4 pb-7 px-6"
            >

                <div className="grid grid-cols-1">
                    <div>
                        <FormInputGroup
                            register={register}
                            inputName={"name"}
                            labelName={"Color Name"}
                            errors={errors.name}
                            inputType={"text"}
                            placeholder={"Enter Your Color Name"}
                            errorMessage={"Color Name Is Required!"}
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
                        label={isLoading ? "Loading" : "Update Color"}
                        type="submit"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </AntdModal>
    );
};

export default UpdateColor;
