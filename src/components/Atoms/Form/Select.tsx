import { ConfigProvider, Select } from "antd";


interface OptionType<T> {
    label: string;
    value: T;
}

interface AntdSelectProps {
    options: OptionType<string | object>[] | undefined;
    placeholder?: string | undefined;
    mode?: "multiple" | "tags" | undefined;
    size?: "large" | "middle" | "small" | undefined;
    width: string | number | undefined;
    defaultValues?: string | null | undefined;
    onChange: (value: string) => void; 
}

function AntdSelect({
    options,
    placeholder,
    mode,
    defaultValues,
    width = "100%",
    size = "large",
    onChange,
    ...rest
}: AntdSelectProps) {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#10b981",
                        colorBgContainer: "white",
                        fontSize: 15,
                        controlHeight: 52,
                        borderRadius: 24,
                    },
                    components: {
                        Select: {
                            colorTextPlaceholder: "#6b7280",
                        },
                    },
                }}
            >
                <div className="">
                    <Select
                        size={size}
                        style={{ width: width }}
                        defaultValue={defaultValues}
                        placeholder={placeholder}
                        options={options}
                        mode={mode}
                        onChange={onChange}
                        {...rest}
                    />
                </div>
            </ConfigProvider>
        </>
    );
}

export default AntdSelect;
