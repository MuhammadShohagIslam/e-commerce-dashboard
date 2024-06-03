import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { ConfigProvider, Image, Upload } from "antd";
import React, { useState } from "react";

import { FileType } from "../../../../../types/image.types";
import { ImageControlHelper } from "../../../../../utils/image";

type AntdUploadImageType = {
    fileList: UploadFile<FileType>[];
    isError: boolean;
    setFileList: React.Dispatch<React.SetStateAction<UploadFile<FileType>[]>>;
    maxCount: number;
    title: string
};

const AntdUploadImage: React.FC<AntdUploadImageType> = ({
    fileList,
    setFileList,
    isError,
    maxCount = 6,
    title="Image Upload"
}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    // handle preview image
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await ImageControlHelper.getBase64(
                file.originFileObj as FileType
            );
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen((prev) => !prev);
    };

    // handle change image
    const handleChange: UploadProps["onChange"] = async (info) => {
        let newFileList = [...info.fileList];

        newFileList = newFileList.slice(-8);

        newFileList = newFileList.map((file) => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });

        setFileList(newFileList);
    };

    // other state and functions remain unchanged
    const beforeUpload = (): boolean => {
        return false;
    };

    const uploadButton = (
        <button
            className={`border-none bg-none hover:border hover:border-success transition-all ${
                isError ? "border-[1px] border-red-700 text-red-600" : ""
            }`}
            type="button"
        >
            <PlusOutlined
                className={`${isError ? " text-red-500" : "text-success"}`}
            />
            <div
                className={`px-1 ${isError ? " text-red-500" : "text-success"}`}
            >
                {title}
            </div>
        </button>
    );
    return (
        <div className="my-3">
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: isError ? "#b91c1c" : "#10b981",
                    },
                }}
            >
                <Upload
                    beforeUpload={beforeUpload}
                    accept="image/*"
                    listType="picture-card"
                    fileList={fileList}
                    multiple={true}
                    maxCount={maxCount}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                    <Image
                        wrapperStyle={{ display: "none" }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) =>
                                setPreviewOpen(visible),
                            afterOpenChange: (visible) =>
                                !visible && setPreviewImage(""),
                        }}
                        src={previewImage}
                    />
                )}
            </ConfigProvider>
        </div>
    );
};

export default AntdUploadImage;
