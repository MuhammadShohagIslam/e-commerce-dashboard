import { IBrand } from "./brand.types";
import { ICategory } from "./category.type";
import { IColor } from "./color.types";
import { ISize } from "./size.types";
import { ISubCategory } from "./sub-category.type";

export interface IProduct {
    _id: string;
    name: string;
    metaTitle: string;
    slug: string;
    description: string;
    price: number;
    discount: number;
    category: ICategory;
    subCategory: ISubCategory[];
    quantity: number;
    sold: number;
    imageURLs: string[];
    shipping: string;
    colors: IColor[];
    sizes: ISize[];
    brand: IBrand;
    updatedAt: Date;
    __v: number;
}

export interface OrderProductType {
    count: number;
    price: number;
    product: IProduct;
    _id: string;
}
