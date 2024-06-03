import React from "react";
import cn from "../../../utils/cn";

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
    name: string;
    className?: string;
}


const Label: React.FC<LabelProps> = ({ name, className, ...restProps }) => {
    return (
        <label
            {...restProps}
            className={cn(
                "block mb-2 text-base font-medium text-gray-800",
                className ? className : ""
            )}
        >
            {name}
        </label>
    );
};

export default Label;
