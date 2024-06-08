import { ICategory } from "./category.type";

export interface ISubCategory {
    _id: string;
    name: string;
    imageURL: string;
    categoryId: ICategory;
    createdAt: Date;
    updatedAt: Date;
}
