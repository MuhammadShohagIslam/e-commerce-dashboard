import { UploadFile } from "antd"

export type TCreateCategoryForm = {
    categoryImage: UploadFile,
    name: string
}