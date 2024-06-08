import React, { ReactNode } from "react";
import { Helmet } from "react-helmet";

interface MetaTagProps {
    title: string;
    description: string;
    children?: ReactNode;
}

const MetaTag: React.FC<MetaTagProps> = ({ title, description, children }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name="description" content={description} />
            {children}
        </Helmet>
    );
};

export default MetaTag;
