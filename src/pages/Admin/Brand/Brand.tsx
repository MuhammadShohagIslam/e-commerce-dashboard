import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import Button from "../../../components/Atoms/Button/Button";
import Table from "../../../components/Molecules/Table/Table";
import TableFilter from "../../../components/Organisms/Table/TableFilter/TableFilter";
import useDebounce from "../../../hooks/useDebounce";

import TableHeader from "../../../components/Molecules/Table/TableHeader";
import CreateBrand from "../../../components/Organisms/Form/Brand/Create/CreateBrand";
import UpdateBrand from "../../../components/Organisms/Form/Brand/Update/UpdateBrand";
import DeleteModal from "../../../components/Organisms/Modal/Delete/DeleteModal";
import AntdImage from "../../../components/Molecules/Image/Image";

import {
    useGetBrandsQuery,
    useRemovedBrandMutation,
} from "../../../redux/services/brand/brandApi";
import { IBrand } from "../../../types/brand.types";

const BrandPage = () => {
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
        data: IBrand | null;
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
        populate: "categoryId",
    });

    // redux api call
    const { data, isError, isLoading } = useGetBrandsQuery(
        queryParams.toString()
    );
    const [removedBrand, { isLoading: isDeleteLoading }] =
        useRemovedBrandMutation();

    // handle remove item
    const handleRemoveItem = (id: string) => {
        setDeleteModal({
            data: id,
            open: true,
        });
    };

    // handle edit item
    const handleEditItem = (item: IBrand) => {
        setUpdateModal({
            data: item,
            open: true,
        });
    };

    // handle add item
    const handleAddBrand = () => {
        setIsModalOpen((prev) => !prev);
    };

    return (
        <>
            <div>
                <TableHeader
                    buttonName="Add Brand"
                    buttonClassName={
                        "text-gray-800 hover:shadow-white/50 bg-white shadow-white/30 py-3 px-4"
                    }
                    className={"lg:mt-10 mt-5 mb-7"}
                    headerTitle={"All Brand"}
                    onClick={() => handleAddBrand()}
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
                                name: "Image",
                                dataIndex: "_id",
                                render: ({ item }) => (
                                    <div className="flex">
                                        {item?.imageURL ? (
                                            <AntdImage
                                                src={item?.imageURL}
                                                height={40}
                                                width={40}
                                                className={
                                                    "w-10 h-10 rounded-full"
                                                }
                                                alt={"brand-image"}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                ),
                            },
                            {
                                name: "Name",
                                dataIndex: "name",
                                key: "_id",
                            },
                            {
                                name: "Email",
                                dataIndex: "email",
                                key: "_id",
                            },
                            {
                                name: "Location",
                                dataIndex: "location",
                                key: "_id",
                            },
                            {
                                name: "Website",
                                dataIndex: "website",
                                render: ({ item }) => (
                                    <h2 className="truncate">
                                        {item.website}
                                    </h2>
                                ),
                            },
                            {
                                name: "description",
                                dataIndex: "description",
                                render: ({ item }) => (
                                    <h2 className="truncate">
                                        {item.description}
                                    </h2>
                                ),
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

            {/* create brand */}
            {isModalOpen ? (
                <CreateBrand
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            ) : (
                ""
            )}

            {/* delete brand */}
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
                    deleteActionMethod={removedBrand}
                    deletePayload={deleteModal?.data}
                />
            ) : (
                ""
            )}

            {/* update brand */}
            {updateModal.open ? (
                <UpdateBrand
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

export default BrandPage;
