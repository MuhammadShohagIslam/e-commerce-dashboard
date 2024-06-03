import React, { useEffect } from "react";
import cn from "../../../utils/cn";

interface CustomModalProps {
    children: React.ReactNode;
    onClose: () => void;
    className?: string;
    title?: string;
    isModalOpen: boolean;
    modalWidth?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
    children,
    onClose,
    title = "New Modal",
    className = "",
    modalWidth = "w-[400px]",
    isModalOpen=false
}) => {
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (
                onClose &&
                (e.target as HTMLElement).classList.contains("modal-overlay")
            ) {
                onClose();
            }
        };

        window.addEventListener("click", (e) => {
            handleOutsideClick(e);
        });

        return () => {
            window.removeEventListener("click", (e) => {
                handleOutsideClick(e);
            });
        };
    }, [onClose]);

    return (
        <div
            className={cn(
                `overflow-y-auto origin-top-right transition-all duration-700 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-[calc(100%)] bg-primary/20 flex modal-overlay ${isModalOpen ? "scale-100" : "scale-0"}`,
                className
            )}
        >
            <div
                className={`h-[calc(100%)] flex w-full justify-center items-center`}
            >
                <div
                    className={`relative p-4 w-full ${modalWidth} bg-white rounded-md mx-auto`}
                >
                    <div
                        className={`flex items-center justify-between pb-2 border-b rounded-t `}
                    >
                        <div className="flex items-center gap-1">
                            <div className="bg-success w-1 h-5"></div>
                            <h3 className="text-lg font-semibold text-gray-900 capitalize">
                                {title}
                            </h3>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-primary bg-primary/10 hover:bg-rose-400 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-all"
                            data-modal-toggle="crud-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="drop-shadow-md h-[450px] overflow-y-auto overflow-x-hidden">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
