import CreateProductForm from "../../components/Organisms/Form/Product/Create/CreateProduct";
import MetaTag from "../../utils/MetaTag";

import { useGetBrandsQuery } from "../../redux/services/brand/brandApi";
import { useGetCategoriesQuery } from "../../redux/services/category/categoryApi";
import { useGetColorsQuery } from "../../redux/services/color/colorApi";
import { useGetSizesQuery } from "../../redux/services/size/sizeApi";
import { useGetSubCategoriesQuery } from "../../redux/services/subCategory/subCategoryApi";

const UpdateProductPage = () => {
    const queryParams = new URLSearchParams({
        limit: JSON.stringify(0),
    });
    const { data: categoryData } = useGetCategoriesQuery(
        queryParams.toString()
    );
    const { data: subCategoryData } = useGetSubCategoriesQuery(
        queryParams.toString()
    );
    const { data: brandData } = useGetBrandsQuery(queryParams.toString());
    const { data: colorData } = useGetColorsQuery(queryParams.toString());
    const { data: sizeData } = useGetSizesQuery(queryParams.toString());

    return (
        <>
            <MetaTag
                title="Update Product"
                description="Update and manage your product listings on Aladin. Edit product details, adjust pricing, and keep your store's inventory accurate."
            />

            <div>
                <div className="bg-secondary px-9 pt-10  pb-9 rounded-lg">
                    <h2 className="text-center font-semibold text-primary text-2xl">
                        Update Product
                    </h2>
                    <CreateProductForm
                        sizes={sizeData?.data}
                        colors={colorData?.data}
                        categories={categoryData?.data}
                        brands={brandData?.data}
                        subCategories={subCategoryData?.data}
                    />
                </div>
            </div>
        </>
    );
};

export default UpdateProductPage;
