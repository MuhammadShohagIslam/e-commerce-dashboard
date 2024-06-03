export interface ICurrentUser {
    name: string;
    profileImage: string;
    email: string;
    about: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
    __v?: number;
    _id?: string;
}

export interface IUser {
    name: string;
    profileImage: string;
    email: string;
    _id?: string;
}

export interface IShippingAddress {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    postCode: string;
    country: string;
    phoneNumber: string;
    state: string;
    modalName?:string
}
