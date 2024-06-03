import { UploadFile } from "antd"

export type TCreateSubCategoryForm = {
    subCategoryImage: UploadFile,
    name: string
    category: string
}