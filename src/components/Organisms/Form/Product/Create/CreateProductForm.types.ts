import { UploadFile } from "antd";

export interface ICreateProductForm {
    name: string;
    metaTitle: string;
    price: number;
    shipping: string;
    discount: number;
    isFeatured: string;
    quantity: number;
    category: string;
    brand: string;
    colors: string;
    sizes: string;
    subCategories: string;
    description: string;
    productImgFiles: UploadFile[];
}
