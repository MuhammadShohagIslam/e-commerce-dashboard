import { useEffect, useState } from "react";
import { UploadFile } from "antd";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Paragraph from "../../../../Atoms/Paragraph";
import AntdModal from "../../../../Atoms/Modal/AntdModal";
import FormInputGroup from "../../../../Molecules/Form/FormInputGroup";
import Button from "../../../../Atoms/Button/Button";
import AntdUploadImage from "../../../../Molecules/Upload/Images/MultiImageUpload/AntdUploadImage";

import { TUpdateCategoryForm } from "./UpdateCategory.type";
import { useUpdateCategoryMutation } from "../../../../../redux/services/category/categoryApi";
import { CustomFetchBaseQueryError } from "../../../../../types/response";
import { ICategory } from "../../../../../types/category.type";
import { ArrayDataModifyHelpers } from "../../../../../utils/arrayDataModify";

type UpdateCategoryFormType = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<
        React.SetStateAction<{
            data: ICategory | null;
            open: boolean;
        }>
    >;
    updateData: ICategory | null;
};

const UpdateCategory = ({
    isModalOpen,
    setIsModalOpen,
    updateData,
}: UpdateCategoryFormType) => {
    // state
    const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // redux api call
    const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

    // react hook form
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<TUpdateCategoryForm>({
        defaultValues: {
            name: "",
        },
    });

    // submit handler to submit data to server
    const handleUpdateCategory = async (data: TUpdateCategoryForm) => {
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

        const imageURLs =
            ArrayDataModifyHelpers.imageObjectArrayToStringModify(imageFiles);

        formData.append("imageURLs", JSON.stringify(imageURLs));

        // Append each image file individually to the FormData object
        imageFiles.forEach((file) => {
            if (file?.originFileObj) {
                formData.append(`categoryImage`, file.originFileObj as Blob);
            }
        });

        const result = await updateCategory({
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
                    customError.data?.message || "Failed to Create Category!";
                setErrorMessage(errorMessage);
            } else {
                setErrorMessage("Internal Server Error!");
            }
        }
    };

    // update category data
    useEffect(() => {
        if (updateData) {
            reset({
                name: updateData?.name,
            });
            setImageFiles(
                ArrayDataModifyHelpers.imageStringArrayToObjectModify(
                    updateData?.imageURLs
                )
            );
        }
    }, [updateData, reset]);

    return (
        <AntdModal
            title="Update Category"
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
                onSubmit={handleSubmit(handleUpdateCategory)}
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
                        label={isLoading ? "Loading" : "Update Category"}
                        type="submit"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </AntdModal>
    );
};

export default UpdateCategory;
