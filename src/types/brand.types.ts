export interface IBrand {
    name: string;
    email: string;
    location: string;
    website: string;
    description: string;
    imageURL: string;
    status: "active" | "inActive";
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    _id: string;
}
