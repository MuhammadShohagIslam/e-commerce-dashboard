import { useEffect, useState } from "react";
import { UploadFile } from "antd";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Paragraph from "../../../../Atoms/Paragraph";
import AntdModal from "../../../../Atoms/Modal/AntdModal";
import FormInputGroup from "../../../../Molecules/Form/FormInputGroup";
import Button from "../../../../Atoms/Button/Button";
import AntdUploadImage from "../../../../Molecules/Upload/Images/MultiImageUpload/AntdUploadImage";
import FormSelectGroup from "../../../../Molecules/Form/FormSelectGroup";

import { TUpdateSubCategoryForm } from "./UpdateSubCategory.type";
import { useUpdateSubCategoryMutation } from "../../../../../redux/services/subCategory/subCategoryApi";
import { CustomFetchBaseQueryError } from "../../../../../types/response";
import { ArrayDataModifyHelpers } from "../../../../../utils/arrayDataModify";
import { ISubCategory } from "../../../../../types/sub-category.type";
import { useGetCategoriesQuery } from "../../../../../redux/services/category/categoryApi";

type UpdateSubCategoryFormType = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<
        React.SetStateAction<{
            data: ISubCategory | null;
            open: boolean;
        }>
    >;
    updateData: ISubCategory | null;
};

const UpdateSubCategory = ({
    isModalOpen,
    setIsModalOpen,
    updateData,
}: UpdateSubCategoryFormType) => {
    // state
    const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // search query parameter
    const queryParams = new URLSearchParams({
        limit: JSON.stringify(0),
    });

    // redux api call
    const [updateSubCategory, { isLoading }] = useUpdateSubCategoryMutation();
    const { data: categoryData } = useGetCategoriesQuery(
        queryParams.toString()
    );

    // react hook form
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        reset,
        getValues,
    } = useForm<TUpdateSubCategoryForm>({
        defaultValues: {
            name: "",
        },
    });

    // submit handler to submit data to server
    const handleUpdateSubCategory = async (data: TUpdateSubCategoryForm) => {
        // checking image has
        if (imageFiles?.length < 1) {
            setErrorMessage("Please Add Image!");
            toast.error("Please add image!");
            return;
        }

        const selectData = {
            category: data.category
                ? JSON.parse(data.category).categoryId
                : updateData?.categoryId?._id,
        };

        // Create a new FormData object
        const formData = new FormData();

        // Append form fields to the FormData object
        formData.append("name", data.name);
        formData.append("categoryId", selectData.category);

        // Append each image file individually to the FormData object
        imageFiles.forEach((file) => {
            if (file?.originFileObj) {
                formData.append(`subCategoryImage`, file.originFileObj as Blob);
            }
        });

        const result = await updateSubCategory({
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
                    customError.data?.message ||
                    "Failed to Create Sub Category!";
                setErrorMessage(errorMessage);
            } else {
                setErrorMessage("Internal Server Error!");
            }
        }
    };

    // update SubCategory data
    useEffect(() => {
        if (updateData) {
            reset({
                name: updateData?.name,
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
            title="Update SubCategory"
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
                onSubmit={handleSubmit(handleUpdateSubCategory)}
                className="lg:mt-5 md:mt-0 mt-0  pt-4 pb-7 px-6"
            >
                <div className="grid grid-cols-1">
                    <AntdUploadImage
                        fileList={imageFiles}
                        setFileList={setImageFiles}
                        isError={imageFiles?.length > 0 ? false : true}
                        maxCount={1}
                        title="Upload Image"
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
                                categoryData?.data,
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
                            defaultValue={ArrayDataModifyHelpers.arrayDataToOptions(
                                [
                                    {
                                        ...updateData?.categoryId,
                                    },
                                ],
                                "name",
                                {
                                    id: "categoryId",
                                    name: "name",
                                },
                                {
                                    id: "categoryId",
                                    name: "name",
                                }
                            )}
                            placeholder={"Select Product Category"}
                            labelName={"Category"}
                            selectName={"category"}
                            control={control}
                            errors={errors.category}
                            errorMessage={
                                getValues("category") === undefined
                                    ? ""
                                    : "Product Category Is Required!"
                            }
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
                        className={`text-white py-3 px-4 disabled:cursor-not-allowed hover:shadow-green-500/40 capitalize bg-green-500 shadow-green-500/20`}
                        label={isLoading ? "Loading" : "Update Sub Category"}
                        type="submit"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </AntdModal>
    );
};

export default UpdateSubCategory;
