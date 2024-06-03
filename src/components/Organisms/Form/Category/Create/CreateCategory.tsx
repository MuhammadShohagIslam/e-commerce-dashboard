import { useState } from "react";
import { UploadFile } from "antd";
import { useForm } from "react-hook-form";

import AntdModal from "../../../../Atoms/Modal/AntdModal";
import FormInputGroup from "../../../../Molecules/Form/FormInputGroup";
import Button from "../../../../Atoms/Button/Button";
import AntdUploadImage from "../../../../Molecules/Upload/Images/MultiImageUpload/AntdUploadImage";

import { TCreateCategoryForm } from "./createCategory.type";
import { useCreateCategoryMutation } from "../../../../../redux/services/category/categoryApi";
import toast from "react-hot-toast";
import { CustomFetchBaseQueryError } from "../../../../../types/response";
import Paragraph from "../../../../Atoms/Paragraph";

type CreateCategoryFormType = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCategory = ({
    isModalOpen,
    setIsModalOpen,
}: CreateCategoryFormType) => {
    // state
    const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // redux api call
    const [createCategory, { isLoading }] = useCreateCategoryMutation();

    // react hook form
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<TCreateCategoryForm>({
        defaultValues: {
            name: "",
        },
    });

    // submit handler to submit data to server
    const handleAddCategory = async (data: TCreateCategoryForm) => {
        // checking image has
        if (imageFiles?.length < 1) {
            toast.error("Please add image!");
            return;
        }

        // Create a new FormData object
        const formData = new FormData();

        // Append form fields to the FormData object
        formData.append("name", data.name);

        // Append each image file individually to the FormData object
        imageFiles.forEach((file) => {
            formData.append(`categoryImage`, file.originFileObj as Blob);
        });

        const result = await createCategory(formData);

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            reset();
            setImageFiles([]);
            toast.success(result.data.message);
            setErrorMessage('')
            setIsModalOpen((prev) => !prev)
        } else {
            if ("error" in result && result.error) {
                const customError = result.error as CustomFetchBaseQueryError;
                const errorMessage =
                    customError.data?.message || "Failed to create category";
                setErrorMessage(errorMessage);
            }
        }
    };

    return (
        <AntdModal
            title="Add New Category"
            isModalOpen={isModalOpen}
            onCancel={() => setIsModalOpen((prev) => !prev)}
        >
            <form
                onSubmit={handleSubmit(handleAddCategory)}
                className="lg:mt-5 md:mt-0 mt-0  pt-4 pb-7 px-6"
            >
                <div className="grid grid-cols-1">
                    <AntdUploadImage
                        fileList={imageFiles}
                        setFileList={setImageFiles}
                        isError={imageFiles?.length > 0 ? false : true}
                        maxCount={4}
                        title={"Category Image Upload"}
                    />
                </div>
                <div className="grid grid-cols-1">
                    <div>
                        <FormInputGroup
                            register={register}
                            inputName={"name"}
                            labelName={"Category Name"}
                            errors={errors.name}
                            inputType={"text"}
                            placeholder={"Enter Your Category Name"}
                            errorMessage={"Category Name Is Required!"}
                            className={"drop-shadow-md"}
                        />
                    </div>
                </div>

                {errorMessage ? (
                    <div>
                        <Paragraph
                            text={errorMessage}
                            className={"text-red-500 text-sm capitalize font-medium"}
                        />
                    </div>
                ) : (
                    ""
                )}

                <div className="mt-5">
                    <Button
                        className={`text-white py-3 px-4 disabled:cursor-not-allowed hover:shadow-green-500/40 bg-green-500 shadow-green-500/20`}
                        label={isLoading ? "Loading" : "Add Category"}
                        type="submit"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </AntdModal>
    );
};

export default CreateCategory;
