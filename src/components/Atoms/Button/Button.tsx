import React, { ButtonHTMLAttributes } from "react";
import cn from "../../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string | React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    className,
    ...rest
}) => {
    return (
        <button
            {...rest}
            className={cn(
                "middle none center rounded-lg px-3 py-2  shadow-lg font-sans text-xs font-bold uppercase  transition-all hover:shadow-lg  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
                className ? className : ""
            )}
            onClick={onClick && onClick}
        >
            {label}
        </button>
    );
};

export default Button;
