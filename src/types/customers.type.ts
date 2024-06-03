export interface ICustomers {
    _id: string;
    username: string;
    name: string;
    email: string | null;
    image: {
        url: string | null;
        public_id: string;
    };
    address: {
        fullName: string;
        address: string;
        country: string;
        city: string;
        postalCode: string | number;
    };
    role: string;
    cart: any[];
    wishList: any[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
