import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UploadFile } from "antd";
import toast from "react-hot-toast";

import Paragraph from "../../../../Atoms/Paragraph";
import FormGroup from "../../../../Molecules/Form/FormInputGroup";
import Button from "../../../../Atoms/Button/Button";
import FormRichTextGroup from "../../../../Molecules/Form/FormRichTextGroup";
import FormSelectGroup from "../../../../Molecules/Form/FormSelectGroup";
import AntdModal from "../../../../Atoms/Modal/AntdModal";
import FormTextAreaGroup from "../../../../Molecules/Form/FormTextAreaGroup";
import FormSkeleton from "../../../Skeleton/Form/Form";
import AntdUploadImage from "../../../../Molecules/Upload/Images/MultiImageUpload/AntdUploadImage";

import { ArrayDataModifyHelpers } from "../../../../../utils/arrayDataModify";
import { IUpdateProductForm } from "./UpdateProduct.types";
import {
    useGetProductQuery,
    useUpdateProductMutation,
} from "../../../../../redux/services/product/productApi";
import { CustomFetchBaseQueryError } from "../../../../../types/response";
import { useGetCategoriesQuery } from "../../../../../redux/services/category/categoryApi";
import { useGetSubCategoriesQuery } from "../../../../../redux/services/subCategory/subCategoryApi";
import { useGetBrandsQuery } from "../../../../../redux/services/brand/brandApi";
import { useGetColorsQuery } from "../../../../../redux/services/color/colorApi";
import { useGetSizesQuery } from "../../../../../redux/services/size/sizeApi";

type UpdateProductFormType = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<
        React.SetStateAction<{
            data: string;
            open: boolean;
        }>
    >;
    id: string;
};

const UpdateProduct = ({
    isModalOpen,
    setIsModalOpen,
    id,
}: UpdateProductFormType) => {
    // state
    const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const queryParams = new URLSearchParams({
        limit: JSON.stringify(0),
    });
    
    // redux api call
    const [updateProduct, { isLoading }] = useUpdateProductMutation();
    const { data: categoryData } = useGetCategoriesQuery(
        queryParams.toString()
    );
    const { data: subCategoryData } = useGetSubCategoriesQuery(
        queryParams.toString()
    );
    const { data: brandData } = useGetBrandsQuery(queryParams.toString());
    const { data: colorData } = useGetColorsQuery(queryParams.toString());
    const { data: sizeData } = useGetSizesQuery(queryParams.toString());
    const { data: productData } = useGetProductQuery(id);
    const updateData = productData?.data;

    // react hook form
    const {
        handleSubmit,
        register,
        control,
        getValues,
        formState: { errors },
        reset,
    } = useForm<IUpdateProductForm>({
        defaultValues: {
            name: "",
            metaTitle: "",
            description: "",
        },
    });

    // submit handler to submit data to server
    const handleAddProduct = async (data: IUpdateProductForm) => {
        // checking image has
        if (imageFiles?.length < 1) {
            toast.error("Please add image!");
            return;
        }

        // Create a new FormData object
        const formData = new FormData();

        const selectData = {
            category: data.category
                ? JSON.stringify(data.category)
                : JSON.stringify(updateData.category),
            brand: data.brand
                ? JSON.stringify(data.brand)
                : JSON.stringify(updateData.brand),
            subCategories: data.subCategories
                ? JSON.stringify(data.subCategories)
                : JSON.stringify(
                      ArrayDataModifyHelpers.arrayDataToModifyArray(
                          updateData.subCategories,
                          {
                              id: "subCategoryId",
                              name: "name",
                          }
                      )
                  ),
            sizes: data.sizes
                ? JSON.stringify(data.sizes)
                : JSON.stringify(
                      ArrayDataModifyHelpers.arrayDataToModifyArray(
                          updateData.sizes,
                          {
                              id: "sizeId",
                              name: "name",
                          }
                      )
                  ),
            colors: data.colors
                ? JSON.stringify(data.colors)
                : JSON.stringify(
                      ArrayDataModifyHelpers.arrayDataToModifyArray(
                          updateData.colors,
                          {
                              id: "colorId",
                              name: "name",
                          }
                      )
                  ),
            isFeatured: data.isFeatured
                ? JSON.stringify(data.isFeatured)
                : JSON.stringify(updateData.isFeatured),
        };

        // Append form fields to the FormData object
        formData.append("name", data.name);
        formData.append("metaTitle", data.metaTitle);
        formData.append("description", data.description);
        formData.append("category", selectData.category);
        formData.append("brand", selectData.brand);
        formData.append("price", JSON.stringify(data.price));
        formData.append("discount", JSON.stringify(data.discount));
        formData.append("quantity", JSON.stringify(data.quantity));
        formData.append("isFeatured", selectData.isFeatured);
        formData.append("subCategories", selectData.subCategories);
        formData.append("sizes", selectData.sizes);
        formData.append("colors", selectData.colors);

        const imageURLs =
            ArrayDataModifyHelpers.imageObjectArrayToStringModify(imageFiles);

        formData.append("imageURLs", JSON.stringify(imageURLs));

        // Append each image file individually to the FormData object
        imageFiles.forEach((file) => {
            if (file?.originFileObj) {
                formData.append(`productImage`, file.originFileObj as Blob);
            }
        });

        const result = await updateProduct({
            payload: formData,
            id: updateData?._id,
        });

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            reset();
            toast.success(result.data.message);
            setImageFiles([]);
            setErrorMessage("");
            setIsModalOpen((prev) => ({
                ...prev,
                data: "",
                open: false,
            }));
        } else {
            if ("error" in result && result.error) {
                const customError = result.error as CustomFetchBaseQueryError;
                const errorMessage =
                    customError.data?.message || "Failed to create Brand";
                setErrorMessage(errorMessage);
            }
            setIsModalOpen((prev) => ({
                ...prev,
                data: "",
                open: false,
            }));
        }
    };

    // update product data
    useEffect(() => {
        if (updateData) {
            reset({
                name: updateData?.name,
                metaTitle: updateData?.metaTitle,
                description: updateData?.description,
                price: updateData?.price,
                discount: updateData?.discount,
                quantity: updateData?.quantity,
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
            title="Update Product"
            isModalOpen={isModalOpen}
            modalWidth={890}
            isCentered
            onCancel={() =>
                setIsModalOpen((prev) => ({
                    ...prev,
                    data: "",
                    open: false,
                }))
            }
        >
            {!updateData ? (
                <FormSkeleton />
            ) : (
                <form
                    onSubmit={handleSubmit(handleAddProduct)}
                    className="lg:mt-5 md:mt-0 mt-0  pt-4 pb-7 px-6"
                >
                    <div className="grid grid-cols-2">
                        <AntdUploadImage
                            fileList={imageFiles}
                            setFileList={setImageFiles}
                            isError={imageFiles?.length > 0 ? false : true}
                            maxCount={5}
                            title="Product Image Upload"
                        />
                    </div>
                    <div className="grid md:gap-x-5 lg:mb-5 lg:grid-cols-2 grid-cols-1 mb-2 md:mb-0 gap-x-3 gap-y-2">
                        <div>
                            <FormGroup
                                register={register}
                                inputName={"name"}
                                labelName={"Product Name"}
                                errors={errors.name}
                                inputType={"text"}
                                placeholder={"Enter Your Product Name"}
                                errorMessage={"Product Title Is Required!"}
                                className={"drop-shadow-md"}
                            />
                        </div>
                        <div>
                            <FormGroup
                                register={register}
                                inputName={"price"}
                                labelName={"Price"}
                                errors={errors.price}
                                inputType={"number"}
                                placeholder={"Enter Your Product Price"}
                                errorMessage={"Product Price Is Required!"}
                                className={"drop-shadow-md"}
                            />
                        </div>
                        <div className="col-span-2">
                            <FormTextAreaGroup
                                register={register}
                                inputName={"metaTitle"}
                                labelName={"Meta Title"}
                                errors={errors?.metaTitle}
                                placeholder={
                                    "Provide Product Description Here!"
                                }
                                errorMessage={
                                    "Product Product Description Is Required!"
                                }
                                className={"drop-shadow-md"}
                            />
                        </div>

                        <div>
                            <FormGroup
                                register={register}
                                inputName={"discount"}
                                labelName={"Discount"}
                                errors={errors.discount}
                                inputType={"number"}
                                placeholder={"Enter Your Product Discount"}
                                errorMessage={
                                    "Product Price Discount Is Required!"
                                }
                                className={"drop-shadow-md"}
                            />
                        </div>
                        <div>
                            <FormGroup
                                register={register}
                                inputName={"quantity"}
                                labelName={"Quantity"}
                                errors={errors.quantity}
                                inputType={"number"}
                                className={"drop-shadow-md"}
                                placeholder={"Enter Your Product Quantity"}
                                errorMessage="Product Price Quantity Is Required!"
                            />
                        </div>
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
                                            ...updateData?.category,
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
                        <div>
                            <FormSelectGroup
                                options={ArrayDataModifyHelpers.arrayDataToOptions(
                                    subCategoryData?.data,
                                    "name",
                                    {
                                        id: "subCategoryId",
                                        name: "name",
                                    },
                                    {
                                        id: "_id",
                                        name: "name",
                                    }
                                )}
                                defaultValue={ArrayDataModifyHelpers.arrayDataToOptions(
                                    updateData?.subCategories,
                                    "name",
                                    {
                                        id: "subCategoryId",
                                        name: "name",
                                    },
                                    {
                                        id: "subCategoryId",
                                        name: "name",
                                    }
                                )}
                                placeholder={"Select Product Sub Category"}
                                labelName={"Sub Category"}
                                selectName={"subCategories"}
                                control={control}
                                mode={"multiple"}
                                errors={errors.subCategories}
                                errorMessage={
                                    getValues("subCategories") === undefined
                                        ? ""
                                        : "Product Sub Category Is Required!"
                                }
                            />
                        </div>
                        <div>
                            <FormSelectGroup
                                options={ArrayDataModifyHelpers.arrayDataToOptions(
                                    brandData?.data,
                                    "name",
                                    {
                                        id: "brandId",
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
                                            ...updateData?.brand,
                                        },
                                    ],
                                    "name",
                                    {
                                        id: "brandId",
                                        name: "name",
                                    },
                                    {
                                        id: "brandId",
                                        name: "name",
                                    }
                                )}
                                placeholder={"Select Product Brand"}
                                labelName={"Brand"}
                                selectName={"brand"}
                                control={control}
                                errors={errors.brand}
                                errorMessage={
                                    getValues("brand") === undefined
                                        ? ""
                                        : "Product Brand Is Required!"
                                }
                            />
                        </div>
                        <div>
                            <FormSelectGroup
                                options={ArrayDataModifyHelpers.arrayDataToOptions(
                                    colorData?.data,
                                    "name",
                                    {
                                        id: "colorId",
                                        name: "name",
                                    },
                                    {
                                        id: "_id",
                                        name: "name",
                                    }
                                )}
                                defaultValue={ArrayDataModifyHelpers.arrayDataToOptions(
                                    updateData?.colors,
                                    "name",
                                    {
                                        id: "colorId",
                                        name: "name",
                                    },
                                    {
                                        id: "colorId",
                                        name: "name",
                                    }
                                )}
                                placeholder={"Select Product Color"}
                                labelName={"Color"}
                                selectName={"colors"}
                                control={control}
                                errors={errors.colors}
                                mode={"multiple"}
                                errorMessage={
                                    getValues("colors") === undefined
                                        ? ""
                                        : "Product Color Is Required!"
                                }
                            />
                        </div>
                        <div>
                            <FormSelectGroup
                                options={ArrayDataModifyHelpers.arrayDataToOptions(
                                    sizeData?.data,
                                    "name",
                                    {
                                        id: "sizeId",
                                        name: "name",
                                    },
                                    {
                                        id: "_id",
                                        name: "name",
                                    }
                                )}
                                defaultValue={ArrayDataModifyHelpers.arrayDataToOptions(
                                    updateData?.sizes,
                                    "name",
                                    {
                                        id: "sizeId",
                                        name: "name",
                                    },
                                    {
                                        id: "sizeId",
                                        name: "name",
                                    }
                                )}
                                placeholder={"Select Product Size"}
                                labelName={"Size"}
                                selectName={"sizes"}
                                control={control}
                                errors={errors.sizes}
                                mode={"multiple"}
                                errorMessage={
                                    getValues("sizes") === undefined
                                        ? ""
                                        : "Product Size Is Required!"
                                }
                            />
                        </div>
                        <div>
                            <FormSelectGroup
                                options={[
                                    {
                                        label: "Yes",
                                        value: "true",
                                    },
                                    {
                                        label: "No",
                                        value: "false",
                                    },
                                ]}
                                defaultValue={
                                    updateData?.isFeatured
                                        ? [{ label: "Yes", value: "true" }]
                                        : [{ label: "No", value: "false" }]
                                }
                                placeholder={"Select Is Featured"}
                                labelName={"isFeatured"}
                                selectName={"isFeatured"}
                                control={control}
                                errors={errors.isFeatured}
                                errorMessage={
                                    getValues("isFeatured") === undefined
                                        ? ""
                                        : "Is Featured Is Required!"
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <FormRichTextGroup
                            inputName={"description"}
                            labelName={"Description"}
                            control={control}
                            errors={errors?.description}
                            placeholder={"Provide Product Description Here!"}
                            errorMessage={
                                "Product Product Description Is Required!"
                            }
                        />
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
                    <div className="md:mt-5 mt-4">
                        <Button
                            className={`text-white py-3 px-4 disabled:cursor-not-allowed hover:shadow-green-500/40 bg-green-500 shadow-green-500/20 capitalize`}
                            label={isLoading ? "Loading" : "Update Product"}
                            type="submit"
                            disabled={isLoading}
                        />
                    </div>
                </form>
            )}
        </AntdModal>
    );
};

export default UpdateProduct;
