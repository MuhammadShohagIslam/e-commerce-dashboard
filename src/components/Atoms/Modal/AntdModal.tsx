import React, { ReactNode } from "react";
import { ConfigProvider, Modal } from "antd";

interface AntdModalProps {
    onCancel: () => void;
    isModalOpen: boolean;
    isCentered?: boolean | undefined;
    title: string;
    modalWidth?: number | undefined;
    children: ReactNode;
}

const AntdModal: React.FC<AntdModalProps> = ({
    isModalOpen,
    children,
    title,
    onCancel,
    isCentered=true,
    modalWidth=520
}) => {
    const modalStyles = {
        header: {
          borderLeft: `5px solid #10b981`,
          borderRadius: 0,
          paddingInlineStart: 5,
        },
        body: {
            maxHeight: 520, 
            overflowY: 'auto' as const,
            boxShadow: "inset 0 0 5px #999",
            borderRadius: 5,
          
        },
        content: {
          boxShadow: '0 0 30px #999',
        },
      };

    return (
        <ConfigProvider>
            <Modal
                title={title}
                open={isModalOpen}
                footer={null}
                onCancel={onCancel}
                centered={isCentered}
                styles={modalStyles}
                width={modalWidth}
            >
                {children}
            </Modal>
        </ConfigProvider>
    );
};

export default AntdModal;
