import { UploadFile } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "../../../../Atoms/Button/Button";
import AntdModal from "../../../../Atoms/Modal/AntdModal";
import Paragraph from "../../../../Atoms/Paragraph";
import FormInputGroup from "../../../../Molecules/Form/FormInputGroup";
import FormTextAreaGroup from "../../../../Molecules/Form/FormTextAreaGroup";
import AntdUploadImage from "../../../../Molecules/Upload/Images/MultiImageUpload/AntdUploadImage";

import { useCreateBrandMutation } from "../../../../../redux/services/brand/brandApi";
import { CustomFetchBaseQueryError } from "../../../../../types/response";
import { TCreateBrandForm } from "./createBrand.type";

type CreateBrandFormType = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateBrand = ({ isModalOpen, setIsModalOpen }: CreateBrandFormType) => {
    // state
    const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // redux api call
    const [createBrand, { isLoading }] = useCreateBrandMutation();

    // react hook form
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<TCreateBrandForm>({
        defaultValues: {
            name: "",
        },
    });

    // submit handler to submit data to server
    const handleAddBrand = async (data: TCreateBrandForm) => {
        // checking image has
        if (imageFiles?.length < 1) {
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
            formData.append(`brandImage`, file.originFileObj as Blob);
        });

        const result = await createBrand(formData);

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            reset();
            setImageFiles([]);
            setErrorMessage("");
            toast.success(result.data.message);
            setIsModalOpen((prev) => !prev);
        } else {
            if ("error" in result && result.error) {
                const customError = result.error as CustomFetchBaseQueryError;
                const errorMessage =
                    customError.data?.message || "Failed to create Brand";
                setErrorMessage(errorMessage);
            }
        }
    };

    return (
        <AntdModal
            title="Add New Brand"
            isModalOpen={isModalOpen}
            modalWidth={890}
            isCentered
            onCancel={() => setIsModalOpen((prev) => !prev)}
        >
            <form
                onSubmit={handleSubmit(handleAddBrand)}
                className="lg:mt-5 md:mt-0 mt-0  pt-4 pb-7 px-6"
            >
                <div className="grid grid-cols-1">
                    <AntdUploadImage
                        fileList={imageFiles}
                        setFileList={setImageFiles}
                        isError={imageFiles?.length > 0 ? false : true}
                        maxCount={1}
                        title={"Brand Image Upload"}
                        
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
                            inputType={"url"}
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
                        label={isLoading ? "Loading" : "Add Brand"}
                        type="submit"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </AntdModal>
    );
};

export default CreateBrand;
