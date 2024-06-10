import { useState } from "react";
import { UploadFile } from "antd";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import AntdModal from "../../../../Atoms/Modal/AntdModal";
import FormInputGroup from "../../../../Molecules/Form/FormInputGroup";
import Button from "../../../../Atoms/Button/Button";
import Paragraph from "../../../../Atoms/Paragraph";
import FormSelectGroup from "../../../../Molecules/Form/FormSelectGroup";
import AntdUploadImage from "../../../../Molecules/Upload/Images/MultiImageUpload/AntdUploadImage";

import { TCreateSubCategoryForm } from "./createSubCategory.type";
import { useCreateSubCategoryMutation } from "../../../../../redux/services/subCategory/subCategoryApi";
import { CustomFetchBaseQueryError } from "../../../../../types/response";
import { ArrayDataModifyHelpers } from "../../../../../utils/arrayDataModify";
import { useGetCategoriesQuery } from "../../../../../redux/services/category/categoryApi";

type CreateSubCategoryFormType = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateSubCategory = ({
    isModalOpen,
    setIsModalOpen,
}: CreateSubCategoryFormType) => {
    // state
    const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // search query parameter
    const queryParams = new URLSearchParams({
        limit: JSON.stringify(0),
    });

    // redux api call
    const { data: categoryData } = useGetCategoriesQuery(
        queryParams.toString()
    );
    const categories = categoryData?.data;

    const [createSubCategory, { isLoading }] = useCreateSubCategoryMutation();

    // react hook form
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        control,
    } = useForm<TCreateSubCategoryForm>({
        defaultValues: {
            name: "",
        },
    });

    // submit handler to submit data to server
    const handleAddSubCategory = async (data: TCreateSubCategoryForm) => {
        // checking image has
        if (imageFiles?.length < 1) {
            toast.error("Please add image!");
            return;
        }

        // Create a new FormData object
        const formData = new FormData();

        // Append form fields to the FormData object
        formData.append("name", data.name);
        formData.append("categoryId", JSON.parse(data.category).categoryId);

        // Append each image file individually to the FormData object
        imageFiles.forEach((file) => {
            formData.append(`subCategoryImage`, file.originFileObj as Blob);
        });

        const result = await createSubCategory(formData);

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
                    customError.data?.message || "Failed to create SubCategory";
                setErrorMessage(errorMessage);
            }
        }
    };

    return (
        <AntdModal
            title="Add New Sub Category"
            isModalOpen={isModalOpen}
            onCancel={() => setIsModalOpen((prev) => !prev)}
        >
            <form
                onSubmit={handleSubmit(handleAddSubCategory)}
                className="lg:mt-5 md:mt-0 mt-0  pt-4 pb-7 px-6"
            >
                <div className="grid grid-cols-1">
                    <AntdUploadImage
                        fileList={imageFiles}
                        setFileList={setImageFiles}
                        isError={imageFiles?.length > 0 ? false : true}
                        maxCount={1}
                        title={"Image Upload"}
                    />
                </div>
                <div className="grid grid-cols-1">
                    <div>
                        <FormInputGroup
                            register={register}
                            inputName={"name"}
                            labelName={"Sub Category Name"}
                            errors={errors.name}
                            inputType={"text"}
                            placeholder={"Enter Your Sub Category Name"}
                            errorMessage={"Sub Category Name Is Required!"}
                            className={"drop-shadow-md"}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1">
                    <div>
                        <FormSelectGroup
                            options={ArrayDataModifyHelpers.arrayDataToOptions(
                                categories,
                                "name",
                                {
                                    id: "categoryId",
                                    name: "name",
                                },
                                {
                                    id: "_id",
                                    name: "name",
                                }
                            )}
                            placeholder={"Select Category"}
                            labelName={"Category"}
                            selectName={"category"}
                            control={control}
                            errors={errors.category}
                            errorMessage={"Category Is Required!"}
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

                <div className="md:mt-4 mt-2">
                    <Button
                        className={`text-white py-3 px-4 capitalize disabled:cursor-not-allowed hover:shadow-green-500/40 bg-green-500 shadow-green-500/20`}
                        label={isLoading ? "Loading" : "Add Sub Category"}
                        type="submit"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </AntdModal>
    );
};

export default CreateSubCategory;
