import React, { ReactNode, CSSProperties } from "react";
import { Empty as AntdEmpty } from "antd";

interface EmptyProps {
    children?: ReactNode;
    imageStyle?: CSSProperties;
}

const Empty: React.FC<EmptyProps> = ({ children, imageStyle }) => (
    <AntdEmpty imageStyle={imageStyle}>{children}</AntdEmpty>
);

export default Empty;
