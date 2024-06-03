import { ICategories } from "types/category.type";
import { ISubCategories } from "types/sub-category.type";
enum Color {
    "Green",
    "Black",
    "Red",
    "White",
}
enum Brand {
    "Green",
    "Black",
    "Red",
    "White",
}
export interface IFormInputs {
    title: string;
    description: string;
    images: {
        url: string;
        public_id: string;
    }[];
    price: string;
    shipping: string;
    quantity: string;
    color: string;
    colors: Color;
    brand: "";
    brands: Brand;
    category: string;
    categories: ICategories[];
    subCategory: ISubCategories[];
}
