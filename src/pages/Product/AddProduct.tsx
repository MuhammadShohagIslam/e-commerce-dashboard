import CreateProductForm from "../../components/Organisms/Form/Product/Create/CreateProduct";
import MetaTag from "../../utils/MetaTag";

import { useGetBrandsQuery } from "../../redux/services/brand/brandApi";
import { useGetCategoriesQuery } from "../../redux/services/category/categoryApi";
import { useGetColorsQuery } from "../../redux/services/color/colorApi";
import { useGetSizesQuery } from "../../redux/services/size/sizeApi";
import { useGetSubCategoriesQuery } from "../../redux/services/subCategory/subCategoryApi";

const AddProductPage = () => {
    // search query parameter
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
                title="Add Product"
                description="Add new products to your Aladin store. Provide product details, set pricing, and upload images to expand your inventory."
            />

            <div>
                <div className="bg-secondary md:px-9 px-5 md:pt-10 pt-6 md:pb-9 pb-6 rounded-lg">
                    <h2 className="text-center font-semibold text-primary md:text-2xl text-xl md:mb-0 mb-3">
                        Add New Product
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

export default AddProductPage;
