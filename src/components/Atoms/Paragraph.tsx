import React from "react";
import cn from "../../utils/cn";

interface ParagraphProps {
    text: string;
    className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ text, className }) => {
    return (
        <p className={cn("block font-normal", className ? className : "")}>
            {text}
        </p>
    );
};

export default Paragraph;
