import React from "react";
import cn from "../../../utils/cn";

interface CheckBoxProps {
    checked: boolean;
    onChange: () => void;
    className?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
    checked,
    onChange,
    className,
}) => {
    return (
        <input
            type="checkbox"
            className={cn(" ", className ? className : "")}
            checked={checked}
            onChange={onChange}
        />
    );
};

export default CheckBox;
