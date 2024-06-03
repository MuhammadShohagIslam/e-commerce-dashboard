import React from "react";

type SideBarCollapseButtonPropType = {
    toggleAdminSidebar: boolean;
    setToggleAdminSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBarCollapseButton: React.FC<SideBarCollapseButtonPropType> = ({
    toggleAdminSidebar,
    setToggleAdminSidebar,
}) => {
    return (
        <div className="block border-t-2 w-full border-white">
            <label
                onClick={() => setToggleAdminSidebar(!toggleAdminSidebar)}
                className="btn btn-sm btn-circle border-2 hover:bg-success hover:text-white hover:border-success mt-4 ml-3"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                    />
                </svg>
            </label>
        </div>
    );
};

export default SideBarCollapseButton;
