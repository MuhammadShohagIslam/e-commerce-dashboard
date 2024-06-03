import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context value type
interface OpenSettingContextType {
    openSetting: boolean;
    setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
    openProduct: boolean;
    setOpenProduct: React.Dispatch<React.SetStateAction<boolean>>;
    openUser: boolean;
    setOpenUser: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value
export const OpenSettingContext = createContext<
    OpenSettingContextType | undefined
>(undefined);

interface OpenSettingProviderProps {
    children: ReactNode;
}

const OpenSettingProvider: React.FC<OpenSettingProviderProps> = ({
    children,
}) => {
    const [openSetting, setOpenSetting] = useState<boolean>(false);
    const [openProduct, setOpenProduct] = useState<boolean>(false);
    const [openUser, setOpenUser] = useState<boolean>(false);

    const value = {
        openSetting,
        setOpenSetting,
        openProduct,
        setOpenProduct,
        openUser,
        setOpenUser,
    };

    return (
        <OpenSettingContext.Provider value={value}>
            {children}
        </OpenSettingContext.Provider>
    );
};

// Custom hook to use the OpenSetting context
export const useOpenSetting = (): OpenSettingContextType => {
    const context = useContext(OpenSettingContext);
    if (!context) {
        throw new Error(
            "useOpenSetting must be used within an OpenSettingProvider"
        );
    }
    return context;
};

export default OpenSettingProvider;
