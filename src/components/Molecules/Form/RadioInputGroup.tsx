import { Radio, ConfigProvider } from "antd";
import {
    Controller,
    Control,
    FieldValues,
    FieldError,
    Path,
} from "react-hook-form";

import Label from "../../Atoms/Form/Label";

interface RadioInputGroupProps<T extends FieldValues> {
    control: Control<T>;
    errorMessage: string | undefined;
    radioName: Path<T>;
    labelName: string;
    errors?: FieldError | undefined;
    defaultValue?: T | null | undefined;
    radioOptions: string[]
}

const RadioInputGroup = <T extends FieldValues>({
    control,
    radioName,
    labelName,
    errorMessage,
    errors,
    radioOptions,
    ...rest
}: RadioInputGroupProps<T>) => {

    return (
        <div className="mb-3">
            <Label name={labelName} {...{ htmlFor: radioName }} />
            <div className="drop-shadow-md">
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: errors?.message
                                ? "#fef2f2"
                                : "#10b981",
                            colorBorder: errors?.message
                                ? "#fee2e2"
                                : "#10b981",
                            colorBgContainer: errors?.message
                                ? "#fef2f2"
                                : "white",
                            controlHeight: 45,
                        },
                        components: {
                            DatePicker: {
                                colorTextPlaceholder: errors?.message
                                    ? "#dc2626"
                                    : "#6b7280",
                            },
                        },
                    }}
                >
                    <Controller
                        name={radioName}
                        control={control}
                        rules={{
                            required: errorMessage ? errorMessage : false,
                        }}
                        render={({ field }) => (
                            <Radio.Group
                                options={radioOptions}
                                onChange={field.onChange}
                                value={field.value}
                                {...rest}
                            />
                        )}
                    />
                </ConfigProvider>
            </div>
        </div>
    );
};

export default RadioInputGroup;
