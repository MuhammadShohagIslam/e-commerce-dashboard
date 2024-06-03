import type { CheckboxProps } from 'antd';
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { Checkbox, ConfigProvider } from "antd";

interface AntdCheckBoxProps extends CheckboxProps {
    onChange?: (e: CheckboxChangeEvent) => void;
}

const AntdCheckBox: React.FC<AntdCheckBoxProps> = ({ checked, onChange }) => {
    const onCheckChange = (e: CheckboxChangeEvent) => {
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#10b981",
                    colorBorder: "#10b981",
                    controlHeight:25
                },
            }}
        >
            <Checkbox onChange={onCheckChange} checked={checked} />
        </ConfigProvider>
    );
};

export default AntdCheckBox;
