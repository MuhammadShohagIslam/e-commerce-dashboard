import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import Button from "../../../components/Atoms/Button/Button";
import Table from "../../../components/Molecules/Table/Table";
import TableFilter from "../../../components/Organisms/Table/TableFilter/TableFilter";
import useDebounce from "../../../hooks/useDebounce";

import TableHeader from "../../../components/Molecules/Table/TableHeader";
import CreateSize from "../../../components/Organisms/Form/Size/Create/CreateSize";
import DeleteModal from "../../../components/Organisms/Modal/Delete/DeleteModal";
import UpdateSize from "../../../components/Organisms/Form/Size/Update/UpdateSize";
import MetaTag from "../../../utils/MetaTag";

import {
    useGetSizesQuery,
    useRemovedSizeMutation,
} from "../../../redux/services/size/sizeApi";
import { ISize } from "../../../types/size.types";

const SizePage = () => {
    // state
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<{
        data: string | object | null;
        open: boolean;
    }>({
        data: null,
        open: false,
    });
    const [updateModal, setUpdateModal] = useState<{
        data: ISize | null;
        open: boolean;
    }>({
        data: null,
        open: false,
    });
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const debouncedValue = useDebounce({ searchQuery: searchTerm, delay: 600 });

    // search query parameter
    const queryParams = new URLSearchParams({
        page: JSON.stringify(page),
        limit: JSON.stringify(limit),
        searchTerm: debouncedValue,
    });

    // redux api call
    const { data, isError, isLoading } = useGetSizesQuery(
        queryParams.toString()
    );
    const [removedSize, { isLoading: isDeleteLoading }] =
        useRemovedSizeMutation();

    // handle remove item
    const handleRemoveItem = (id: string) => {
        setDeleteModal({
            data: id,
            open: true,
        });
    };

    // handle edit item
    const handleEditItem = (item: ISize) => {
        setUpdateModal({
            data: item,
            open: true,
        });
    };

    // handle add item
    const handleAddSize = () => {
        setIsModalOpen((prev) => !prev);
    };

    return (
        <>
            <MetaTag
                title="Sizes"
                description="Manage product sizes on Aladin. Create, edit, delete, and organize size options to enhance product variation and presentation in your store."
            />

            <div>
                <TableHeader
                    buttonName="Add Size"
                    buttonClassName={
                        "text-gray-800 hover:shadow-white/50 bg-white shadow-white/30 py-3 px-4"
                    }
                    className={"lg:mt-10 mt-5 mb-7"}
                    headerTitle={"All Sizes"}
                    onClick={() => handleAddSize()}
                    headerClassName={"text-white text-4xl font-bold mb-2"}
                    isAddButtonShow
                />

                <div>
                    <TableFilter
                        page={page}
                        setPage={setPage}
                        setLimit={setLimit}
                        setSearchTerm={setSearchTerm}
                        pages={data?.meta?.totalPage}
                        className={"mb-3"}
                    />
                </div>

                <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-md bg-clip-border rounded-md">
                    <Table
                        isLoading={isLoading}
                        isError={isError}
                        tableData={data?.data}
                        checkbox
                        isCenter
                        handleSelectedRowItem={() => console.log()}
                        columns={[
                            {
                                name: "Name",
                                dataIndex: "name",
                                key: "_id",
                            },
                            {
                                name: "Actions",
                                dataIndex: "actions",
                                render: ({ item }) => (
                                    <div className="flex space-x-2">
                                        <Button
                                            className={`text-white hover:shadow-blue-500/40 bg-blue-500 shadow-blue-500/20`}
                                            label={<FaEdit />}
                                            onClick={() => handleEditItem(item)}
                                        />
                                        <Button
                                            className={`text-white hover:shadow-red-500/40 bg-red-500 shadow-red-500/20`}
                                            label={<FaTrash />}
                                            onClick={() =>
                                                handleRemoveItem(item._id)
                                            }
                                        />
                                    </div>
                                ),
                            },
                        ]}
                    />
                </div>
            </div>

            {/* create Size */}
            {isModalOpen ? (
                <CreateSize
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            ) : (
                ""
            )}

            {/* delete Size */}
            {deleteModal.open ? (
                <DeleteModal
                    title=""
                    onCancel={() =>
                        setDeleteModal((prev) => ({
                            ...prev,
                            data: null,
                            open: false,
                        }))
                    }
                    isModalOpen={deleteModal.open}
                    isLoading={isDeleteLoading}
                    setIsModalOpen={setDeleteModal}
                    deleteActionMethod={removedSize}
                    deletePayload={deleteModal?.data}
                />
            ) : (
                ""
            )}

            {/* update Size */}
            {updateModal.open ? (
                <UpdateSize
                    updateData={updateModal?.data}
                    isModalOpen={updateModal.open}
                    setIsModalOpen={setUpdateModal}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default SizePage;
