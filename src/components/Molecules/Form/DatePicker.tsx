import type { DatePickerProps } from "antd";
import { ConfigProvider, DatePicker } from "antd";
import {
    Controller,
    Control,
    FieldValues,
    FieldError,
    Path,
} from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import type { GetProps } from "antd";

import Label from "../../Atoms/Form/Label";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

interface AntdDatePickerProps<T extends FieldValues> {
    control: Control<T>;
    errorMessage: string | undefined;
    dateName: Path<T>;
    labelName: string;
    errors?: FieldError | undefined;
    defaultValue?: Dayjs | [Dayjs, Dayjs] | undefined;
}

const AntdDatePicker = <T extends FieldValues>({
    control,
    dateName,
    labelName,
    errorMessage,
    errors,
    defaultValue,
    ...rest
}: AntdDatePickerProps<T> & DatePickerProps<T>) => {
    // Can not select days before today and today
    const disabledDate: RangePickerProps["disabledDate"] = (current) => {
        return current && current < dayjs().startOf("day");
    };

    const dateFormat = "YYYY/MM/DD";

    return (
        <div className="mb-3">
            <Label name={labelName} {...{ htmlFor: dateName }} />
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
                        name={dateName}
                        control={control}
                        rules={{
                            required: errorMessage ? errorMessage : false,
                        }}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                {...rest}
                                onChange={field.onChange}
                                disabledDate={disabledDate}
                                format={dateFormat}
                                defaultValue={dayjs(defaultValue, dateFormat)}
                            />
                        )}
                    />
                </ConfigProvider>
            </div>
        </div>
    );
};

export default AntdDatePicker;
