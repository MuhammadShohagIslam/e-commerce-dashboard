import { FC } from "react";
import { ConfigProvider, Image } from "antd";

import cn from "../../../utils/cn";

interface AntdImageProps {
    width: number;
    height: number;
    key?: number | undefined | string;
    src: string;
    alt: string;
    className?: string | undefined;
}

const AntdImage: FC<AntdImageProps> = ({
    width = 20,
    height = 20,
    src,
    key=1,
    className,
    alt = "antd-image",
}) => (
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: "#10b981",
                borderRadius: 50,
            },
        }}
    >
        <div
            key={key}
            className={cn("w-5 h-5 overflow-hidden", className || "")}
        >
            <Image height={height} width={width} src={src} alt={alt} />
        </div>
    </ConfigProvider>
);

export default AntdImage;
