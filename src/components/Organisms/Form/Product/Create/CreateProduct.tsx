import { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadFile } from "antd";
import toast from "react-hot-toast";

import Paragraph from "../../../../Atoms/Paragraph";
import FormGroup from "../../../../Molecules/Form/FormInputGroup";
import Button from "../../../../Atoms/Button/Button";
import FormRichTextGroup from "../../../../Molecules/Form/FormRichTextGroup";
import FormSelectGroup from "../../../../Molecules/Form/FormSelectGroup";
import FormTextAreaGroup from "../../../../Molecules/Form/FormTextAreaGroup";
import AntdUploadImage from "../../../../Molecules/Upload/Images/MultiImageUpload/AntdUploadImage";

import { IBrand } from "../../../../../types/brand.types";
import { ICategory } from "../../../../../types/category.type";
import { IColor } from "../../../../../types/color.types";
import { ISize } from "../../../../../types/size.types";
import { ISubCategory } from "../../../../../types/sub-category.type";
import { ArrayDataModifyHelpers } from "../../../../../utils/arrayDataModify";
import { ICreateProductForm } from "./CreateProductForm.types";
import { useCreateProductMutation } from "../../../../../redux/services/product/productApi";
import { CustomFetchBaseQueryError } from "../../../../../types/response";
import { useNavigate } from "react-router-dom";

type CreateProductFormType = {
    sizes: ISize[];
    colors: IColor[];
    categories: ICategory[];
    subCategories: ISubCategory[];
    brands: IBrand[];
};

const CreateProductForm = ({
    sizes,
    colors,
    categories,
    brands,
    subCategories,
}: CreateProductFormType) => {
    // state
    const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const navigate = useNavigate()

    // redux api call
    const [createProduct, { isLoading }] = useCreateProductMutation();

    // react hook form
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        reset,
    } = useForm<ICreateProductForm>({
        defaultValues: {
            name: "",
            metaTitle: "",
            description: "",
        },
    });

    // submit handler to submit data to server
    const handleAddProduct = async (data: ICreateProductForm) => {
        // checking image has
        if (imageFiles?.length < 1) {
            toast.error("Please add image!");
            return;
        }

        // Create a new FormData object
        const formData = new FormData();

        // Append form fields to the FormData object
        formData.append("name", data.name);
        formData.append("metaTitle", data.metaTitle);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("brand", data.brand);
        formData.append("price", JSON.stringify(data.price));
        formData.append("discount", JSON.stringify(data.discount));
        formData.append("quantity", JSON.stringify(data.quantity));
        formData.append("isFeatured", JSON.stringify(data.isFeatured));
        formData.append("subCategories", JSON.stringify(data.subCategories));
        formData.append("sizes", JSON.stringify(data.sizes));
        formData.append("colors", JSON.stringify(data.colors));

        // Append each image file individually to the FormData object
        imageFiles.forEach((file) => {
            formData.append(`productImage`, file.originFileObj as Blob);
        });

        const result = await createProduct(formData);

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            reset();
            setImageFiles([]);
            setErrorMessage("");
            toast.success(result.data.message);
            navigate("/products")
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
        <form
            onSubmit={handleSubmit(handleAddProduct)}
            className="lg:mt-5 md:mt-0 mt-0"
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
            <div className="grid md:gap-x-5 lg:mb-5 lg:grid-cols-2 grid-cols-1 md:grid-cols-1 mb-2 md:mb-0 gap-x-3 gap-y-2">
                <div className="lg:col-span-1 col-span-2">
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
                <div className="lg:col-span-1 col-span-2">
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
                        placeholder={"Provide Product Description Here!"}
                        errorMessage={
                            "Product Product Description Is Required!"
                        }
                        className={"drop-shadow-md"}
                    />
                </div>

                <div className="lg:col-span-1 col-span-2">
                    <FormGroup
                        register={register}
                        inputName={"discount"}
                        labelName={"Discount"}
                        errors={errors.discount}
                        inputType={"number"}
                        placeholder={"Enter Your Product Discount"}
                        errorMessage={"Product Price Discount Is Required!"}
                        className={"drop-shadow-md"}
                    />
                </div>
                <div className="lg:col-span-1 col-span-2">
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
                <div className="lg:col-span-1 col-span-2">
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
                        placeholder={"Select Product Category"}
                        labelName={"Category"}
                        selectName={"category"}
                        control={control}
                        errors={errors.category}
                        errorMessage={"Product Category Is Required!"}
                    />
                </div>
                <div className="lg:col-span-1 col-span-2">
                    <FormSelectGroup
                        options={ArrayDataModifyHelpers.arrayDataToOptions(
                            subCategories,
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
                        placeholder={"Select Product Sub Category"}
                        labelName={"Sub Category"}
                        selectName={"subCategories"}
                        control={control}
                        mode={"multiple"}
                        errors={errors.subCategories}
                        errorMessage={"Product Sub Category Is Required!"}
                    />
                </div>
                <div className="lg:col-span-1 col-span-2">
                    <FormSelectGroup
                        options={ArrayDataModifyHelpers.arrayDataToOptions(
                            brands,
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
                        placeholder={"Select Product Brand"}
                        labelName={"Brand"}
                        selectName={"brand"}
                        control={control}
                        errors={errors.brand}
                        errorMessage={"Product Brand Is Required!"}
                    />
                </div>
                <div className="lg:col-span-1 col-span-2">
                    <FormSelectGroup
                        options={ArrayDataModifyHelpers.arrayDataToOptions(
                            colors,
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
                        placeholder={"Select Product Color"}
                        labelName={"Color"}
                        selectName={"colors"}
                        control={control}
                        errors={errors.colors}
                        mode={"multiple"}
                        errorMessage={"Product Color Is Required!"}
                    />
                </div>
                <div className="lg:col-span-1 col-span-2">
                    <FormSelectGroup
                        options={ArrayDataModifyHelpers.arrayDataToOptions(
                            sizes,
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
                        placeholder={"Select Product Size"}
                        labelName={"Size"}
                        selectName={"sizes"}
                        control={control}
                        errors={errors.sizes}
                        mode={"multiple"}
                        errorMessage={"Product Size Is Required!"}
                    />
                </div>
                <div className="lg:col-span-1 col-span-2">
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
                        placeholder={"Select Is Featured"}
                        labelName={"isFeatured"}
                        selectName={"isFeatured"}
                        control={control}
                        errors={errors.isFeatured}
                        errorMessage={"Is Featured Is Required!"}
                    />
                </div>
            </div>

            <div className="lg:col-span-1 col-span-2">
                <FormRichTextGroup
                    inputName={"description"}
                    labelName={"Description"}
                    control={control}
                    errors={errors?.description}
                    placeholder={"Provide Product Description Here!"}
                    errorMessage={"Product Product Description Is Required!"}
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
            <div className="mt-5">
                <Button
                    className={`text-white py-3 px-4 disabled:cursor-not-allowed hover:shadow-green-500/40 bg-green-500 shadow-green-500/20`}
                    label={isLoading ? "Loading" : "Update Product"}
                    type="submit"
                    disabled={isLoading}
                />
            </div>
        </form>
    );
};

export default CreateProductForm;
