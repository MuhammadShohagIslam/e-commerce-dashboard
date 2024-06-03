import React from "react";
import cn from "../../../utils/cn";
import Button from "../../Atoms/Button/Button";
import Heading from "../../Atoms/Heading/Heading";

interface TableHeaderProps {
    buttonClassName?: string;
    className?: string;
    buttonName: string;
    headerTitle: string;
    onClick: () => void;
    headerClassName?: string;
    isAddButtonShow?: boolean | undefined;
}

const TableHeader: React.FC<TableHeaderProps> = ({
    buttonClassName,
    className,
    buttonName,
    headerTitle,
    onClick,
    headerClassName,
    isAddButtonShow = false,
}) => {
    return (
        <div className={cn("flex justify-between items-center", className || "")}>
            <Heading title={headerTitle} className={headerClassName} />
            {isAddButtonShow ? (
                <div>
                    <Button
                        className={buttonClassName}
                        label={<h2>{buttonName}</h2>}
                        onClick={onClick}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default TableHeader;
