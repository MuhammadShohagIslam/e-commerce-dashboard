import CreateProductForm from "../../components/Organisms/Form/Product/Create/CreateProduct";
import { useGetBrandsQuery } from "../../redux/services/brand/brandApi";
import { useGetCategoriesQuery } from "../../redux/services/category/categoryApi";
import { useGetColorsQuery } from "../../redux/services/color/colorApi";
import { useGetSizesQuery } from "../../redux/services/size/sizeApi";
import { useGetSubCategoriesQuery } from "../../redux/services/subCategory/subCategoryApi";



const UpdateProductPage = () => {
    const { data: categoryData } = useGetCategoriesQuery("");
    const { data: subCategoryData } = useGetSubCategoriesQuery("");
    const { data: brandData } = useGetBrandsQuery("");
    const { data: colorData } = useGetColorsQuery("");
    const { data: sizeData } = useGetSizesQuery("");

    
    return (
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
    );
};

export default UpdateProductPage;
