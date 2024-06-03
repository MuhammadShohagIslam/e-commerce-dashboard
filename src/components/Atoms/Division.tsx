import React, { ReactNode } from "react";
import cn from "../../utils/cn";

interface DivisionProps {
    children?: ReactNode;
    className?: string;
}

const Division: React.FC<DivisionProps> = ({ children, className }) => {
    return <div className={cn("", className || "")}>{children || ""}</div>;
};

export default Division;
