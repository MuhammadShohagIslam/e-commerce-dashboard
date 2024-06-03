import { UploadFile } from "antd";

export type TCreateBrandForm = {
    brandImage: UploadFile;
    name: string;
    email: string;
    location: string;
    website: string;
    description: string;
    status: "active" | "inActive";
};
