import { ConfigProvider, Select, SelectProps } from "antd";
import {
    Controller,
    Control,
    FieldValues,
    FieldError,
    Path,
} from "react-hook-form";

interface OptionType<T> {
    label: string;
    value: T;
}

interface AntdSelectProps<T extends FieldValues> {
    control: Control<T>;
    options: OptionType<string | object>[] | undefined;
    placeholder: string;
    errorMessage: string | undefined;
    mode: "multiple" | "tags" | undefined;
    selectName: Path<T>;
    errors?: FieldError | undefined;
    defaultValue?:  T | null | undefined | OptionType<string>[]
}

function AntdSelect<T extends FieldValues>({
    control,
    selectName,
    options,
    placeholder,
    errorMessage,
    errors,
    defaultValue,
    mode,
    ...rest
}: AntdSelectProps<T> & SelectProps<T>) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: errors?.message ? "#fef2f2" : "#10b981",
                    colorBgContainer: errors?.message ? "#fef2f2" : "white",
                    fontSize:13,
                    controlHeight: 36
                },
                components: {
                    Select: {
                        colorTextPlaceholder: errors?.message ? "#ef4444" : "#6b7280",
                    } 
                }
            }}
        >
            <div className="drop-shadow-md ">
                <Controller
                    name={selectName}
                    control={control}
                    rules={{
                        required: errorMessage ? errorMessage : false,
                    }}
                    render={({ field }) => (
                        <Select<T>
                            {...field}
                            allowClear
                            size="large"
                            style={{ width: "100%" }}
                            status={errors?.message ? "error" : ""}
                            placeholder={placeholder}
                            options={options}
                            defaultValue={defaultValue}
                            mode={mode}
                            {...rest}
                        />
                    )}
                />
            </div>
        </ConfigProvider>
    );
}

export default AntdSelect;
