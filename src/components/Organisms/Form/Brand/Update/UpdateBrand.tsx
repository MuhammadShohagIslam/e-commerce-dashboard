import { useEffect, useState } from "react";
import { UploadFile } from "antd";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Paragraph from "../../../../Atoms/Paragraph";
import AntdModal from "../../../../Atoms/Modal/AntdModal";
import FormInputGroup from "../../../../Molecules/Form/FormInputGroup";
import Button from "../../../../Atoms/Button/Button";
import FormTextAreaGroup from "../../../../Molecules/Form/FormTextAreaGroup";
import AntdUploadImage from "../../../../Molecules/Upload/Images/MultiImageUpload/AntdUploadImage";

import { TUpdateBrandForm } from "./UpdateBrand.type";
import { useUpdateBrandMutation } from "../../../../../redux/services/brand/brandApi";
import { CustomFetchBaseQueryError } from "../../../../../types/response";

import { ArrayDataModifyHelpers } from "../../../../../utils/arrayDataModify";
import { IBrand } from "../../../../../types/brand.types";

type UpdateBrandFormType = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<
        React.SetStateAction<{
            data: IBrand | null;
            open: boolean;
        }>
    >;
    updateData: IBrand | null;
};

const UpdateBrand = ({
    isModalOpen,
    setIsModalOpen,
    updateData,
}: UpdateBrandFormType) => {
    // state
    const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // redux api call
    const [updateBrand, { isLoading }] = useUpdateBrandMutation();

    // react hook form
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<TUpdateBrandForm>({
        defaultValues: {
            name: "",
            email: "",
            location: "",
            website: "",
            description: "",
        },
    });

    // submit handler to submit data to server
    const handleUpdateBrand = async (data: TUpdateBrandForm) => {
        // checking image has
        if (imageFiles?.length < 1) {
            setErrorMessage("Please Add Image!");
            toast.error("Please add image!");
            return;
        }

        // Create a new FormData object
        const formData = new FormData();

        // Append form fields to the FormData object
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("location", data.location);
        formData.append("website", data.website);
        formData.append("description", data.description);

        // Append each image file individually to the FormData object
        imageFiles.forEach((file) => {
            if (file?.originFileObj) {
                formData.append(`brandImage`, file.originFileObj as Blob);
            }
        });

        const result = await updateBrand({
            payload: formData,
            id: updateData?._id,
        });

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            setImageFiles([]);
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
                    customError.data?.message || "Failed to Create Brand!";
                setErrorMessage(errorMessage);
            } else {
                setErrorMessage("Internal Server Error!");
            }
        }
    };

    // update Brand data
    useEffect(() => {
        if (updateData) {
            reset({
                name: updateData?.name,
                email: updateData?.email,
                location: updateData?.location,
                website: updateData?.website,
                description: updateData?.description,
            });
            setImageFiles(
                ArrayDataModifyHelpers.imageStringArrayToObjectModify([
                    updateData?.imageURL,
                ])
            );
        }
    }, [updateData, reset]);

    return (
        <AntdModal
            title="Update Brand"
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
                onSubmit={handleSubmit(handleUpdateBrand)}
                className="lg:mt-5 md:mt-0 mt-0  pt-4 pb-7 px-6"
            >
                <div className="grid grid-cols-1">
                    <AntdUploadImage
                        fileList={imageFiles}
                        setFileList={setImageFiles}
                        isError={imageFiles?.length > 0 ? false : true}
                        maxCount={1}
                        title="Brand Image Upload"
                    />
                </div>

                <div className="grid grid-cols-2 gap-y-2 gap-x-5">
                    <div>
                        <FormInputGroup
                            register={register}
                            inputName={"name"}
                            labelName={"Name"}
                            errors={errors.name}
                            inputType={"text"}
                            placeholder={"Enter Your Brand Name"}
                            errorMessage={"Brand Name Is Required!"}
                            className={"drop-shadow-md"}
                        />
                    </div>
                    <div>
                        <FormInputGroup
                            register={register}
                            inputName={"email"}
                            labelName={"Email"}
                            errors={errors.email}
                            inputType={"email"}
                            placeholder={"Enter Your Brand Email"}
                            errorMessage={"Brand Email Is Required!"}
                            className={"drop-shadow-md"}
                        />
                    </div>
                    <div>
                        <FormInputGroup
                            register={register}
                            inputName={"location"}
                            labelName={"Location"}
                            errors={errors.location}
                            inputType={"text"}
                            placeholder={"Enter Your Brand Location"}
                            errorMessage={"Brand Location Is Required!"}
                            className={"drop-shadow-md"}
                        />
                    </div>
                    <div>
                        <FormInputGroup
                            register={register}
                            inputName={"website"}
                            labelName={"Website"}
                            errors={errors.website}
                            inputType={"text"}
                            placeholder={"Enter Your Brand Website"}
                            errorMessage={"Brand Website Is Required!"}
                            className={"drop-shadow-md"}
                        />
                    </div>
                    <div>
                        <FormTextAreaGroup
                            register={register}
                            inputName={"description"}
                            labelName={"Description"}
                            errors={errors?.description}
                            placeholder={"Provide Description Here!"}
                            errorMessage={"Description Is Required!"}
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
                        label={isLoading ? "Loading" : "Update Brand"}
                        type="submit"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </AntdModal>
    );
};

export default UpdateBrand;
