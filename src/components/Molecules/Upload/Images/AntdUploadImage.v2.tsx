/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import {
    Controller,
    FieldValues,
    Control,
    Path,
    FieldError,
    UseFormSetValue,
    Merge,
} from "react-hook-form";
import type { UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, ConfigProvider } from "antd";


interface AntdUploadImageProps<T extends FieldValues> {
    control: Control<T>;
    imageUploadName: Path<T>;
    errors:
        | Merge<
              FieldError,
              (
                  | Merge<FieldError, (Merge<FieldError, object> | undefined)[]>
                  | undefined
              )[]
          >
        | undefined;
    setValue: UseFormSetValue<T>;
    errorMessage: string | undefined;
}

const AntdUploadImage = <T extends FieldValues>({
    control,
    imageUploadName,
    setValue,
    errors,
    errorMessage,
}: AntdUploadImageProps<T>) => {
    // console.log(errors, "errors");
    const uploadRef = useRef<any>(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    // handle preview image
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const previewUrl = reader.result as string;
                file.preview = previewUrl;
                setPreviewImage(previewUrl);
                setPreviewOpen(true);
            };
            reader.readAsDataURL(file.originFileObj as Blob);
        } else {
            setPreviewImage(file.url || (file.preview as string));
            setPreviewOpen(true);
        }
    };

    // handle change image
    const handleChange: UploadProps["onChange"] = async (info) => {
        let newFileList = [...info.fileList];

        // Limit the number of files to 8
        newFileList = newFileList.slice(-8);

        // If the file has a response, set its URL
        newFileList = newFileList.map((file: UploadFile) => {
            // console.log(file, "file");
            const reader = new FileReader();
            reader.onloadend = () => {
                const previewUrl = reader.result as string;
                file.thumbUrl = previewUrl;
            };
            return file;
        });
        console.log(newFileList, "newFileList below");
        // Update the form value using React Hook Form's setValue method
        setValue(imageUploadName, newFileList);
    };

    const beforeUpload = (): boolean => {
        return false;
    };

    const uploadButton = (
        <button
            className={`border-none bg-none hover:border hover:border-success transition-all ${
                errors?.message
                    ? "border-[1px] border-red-700 text-red-600"
                    : ""
            }`}
            type="button"
        >
            <PlusOutlined
                className={`${
                    errors?.message ? " text-red-500" : "text-success"
                }`}
            />
            <div
                className={`px-1 ${
                    errors?.message ? " text-red-500" : "text-success"
                }`}
            >
                Product Upload
            </div>
        </button>
    );

    return (
        <div className="my-3">
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: errors?.message ? "#b91c1c" : "#10b981",
                    },
                }}
            >
                <Controller
                    name={imageUploadName}
                    control={control}
                    rules={{
                        required: errorMessage ? errorMessage : false,
                    }}
                    render={({ field }) => (
                        <Upload
                            {...field}
                            ref={uploadRef}
                            beforeUpload={beforeUpload}
                            accept="image/*"
                            listType="picture-card"
                            fileList={field.value}
                            multiple={true}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {field.value?.length >= 8 ? null : uploadButton}
                        </Upload>
                    )}
                />
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
