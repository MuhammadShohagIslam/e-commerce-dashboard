/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from "./product.type";
import { IUser } from "./user.type";

export interface IOrder {
    _id: string;
    products: {
        product: IProduct;
        count: number;
        price: number;
    }[];
    paymentIntents: { [key: string]: any };
    trackingInfo: {
        title: string;
        courier: string;
        trackingNumber: string;
    };
    orderHistory: {
        status: string;
        timestamp: string;
        isDone: boolean;
    };
    orderStatus: string;
    orderedBy: IUser;
    paymentBy?: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
