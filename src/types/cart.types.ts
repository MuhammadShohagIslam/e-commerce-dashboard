import { IProduct } from "./product.type";


export interface CountType {
    count: number; 
}

export type CartType = IProduct & CountType;
