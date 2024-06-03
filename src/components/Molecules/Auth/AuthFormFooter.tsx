import React from "react";
import { Link } from "react-router-dom";

interface AuthFormFooterProps {
    href: string;
    content: string[];
}

const AuthFormFooter: React.FC<AuthFormFooterProps> = ({ href, content }) => {
    return (
        <>
            {/* Form Footer */}
            <div className="flex gap-1 w-full max-w-[450px] mt-3">
                <div className="h-[1px] max-w-[120px] w-full bg-textGray mt-[10px]"></div>
                <h4 className="mb-[15px] text-[14px] text-textGray bg-white whitespace-nowrap flex-1">
                    {content?.[0]}
                </h4>
                <div className="h-[1px] max-w-[120px] w-full bg-textGray mt-[10px]"></div>
            </div>
            <Link to={href}>
                <button className="border-2 px-5 py-2 border-primaryBlack hover:bg-primary font-semibold hover:text-white hover:border-primary rounded-md transition-all durantion-500  w-full">
                    {content?.[1]}
                </button>
            </Link>
        </>
    );
};

export default AuthFormFooter;
