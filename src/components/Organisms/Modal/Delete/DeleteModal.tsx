import React, { useState } from "react";
import { Modal } from "antd";

import Button from "../../../Atoms/Button/Button";
import LoadingImage from "../../../../assets/images/modal/animated-gear.gif";
import SuccessSVG from "../../../../assets/images/modal/check_mark.svg";
import RequestSVG from "../../../../assets/images/modal/request.png";
import ErrorSVG from "../../../../assets/images/modal/sadface.png";

import { DeleteModalProps } from "./DeleteModal.type";

const DeleteModal: React.FC<DeleteModalProps<string | object>> = ({
    isModalOpen,
    title,
    onCancel,
    isLoading,
    setIsModalOpen,
    deleteActionMethod,
    deletePayload,
}) => {
    // state
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    // handle removed item
    const handleRemove = async () => {
        if (deletePayload) {
            const response = await deleteActionMethod(deletePayload);
            // check if the request was successful
            if ("data" in response && response.data && response.data.success) {
                setIsModalOpen((prev) => ({
                    ...prev,
                    data: null,
                    open: false,
                }));
                setIsSuccess((prev) => !prev);
            } else {
                if ("error" in response && response.error) {
                    setIsError((prev) => !prev);
                } else {
                    setIsError((prev) => !prev);
                }
            }
        } else {
            setIsError((prev) => !prev);
        }
    };

    return (
        <Modal
            title={title}
            open={isModalOpen}
            confirmLoading={isLoading}
            onCancel={onCancel}
            footer={null}
        >
            <div>
                <div className="flex flex-col items-center py-10">
                    <img
                        className="w-32"
                        src={
                            isLoading
                                ? LoadingImage
                                : isSuccess
                                ? SuccessSVG
                                : isError
                                ? ErrorSVG
                                : RequestSVG
                        }
                        alt={"delete-processing-image!"}
                    />

                    <span className="text-lg font-bold text-gray-800">
                        {isLoading
                            ? "Processing..."
                            : isSuccess
                            ? "Successfully deleted"
                            : isError
                            ? "Opps..! Something Went Wrong"
                            : "Are You Sure You Want To Delete?"}
                    </span>
                </div>
                <div className="flex space-x-2 justify-center pb-5">
                    <Button
                        className={`text-white hover:shadow-blue-500/40 bg-blue-500 shadow-blue-500/20`}
                        label={"cancel"}
                        onClick={() =>
                            setIsModalOpen((prev) => ({
                                ...prev,
                                data: null,
                                open: false,
                            }))
                        }
                    />
                    <Button
                        className={`text-white hover:shadow-red-500/40 bg-red-500 shadow-red-500/20 px-3.5 py-2.5 ${
                            isLoading ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                        disabled={isLoading}
                        label={
                            isLoading ? (
                                <div className="flex items-center capitalize">
                                    <svg
                                        className="animate-spin h-2 w-2 mr-2 bg-white"
                                        viewBox="0 0 24 24"
                                    ></svg>
                                    Processing...
                                </div>
                            ) : (
                                "Delete"
                            )
                        }
                        onClick={handleRemove}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
