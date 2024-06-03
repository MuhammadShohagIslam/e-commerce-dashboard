import { IProduct } from "./product.type";

// review interface type
export type IReview = {
    _id: string;
    productId: IProduct;
    rating: number;
    userId: {
        profileImage: string;
        name: string;
        email: string;
    };
    comment: string;
    createdAt: Date;
};
