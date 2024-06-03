import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/Atoms/Button/Button";
import AntdImage from "../../../components/Molecules/Image/Image";
import Table from "../../../components/Molecules/Table/Table";
import TableHeader from "../../../components/Molecules/Table/TableHeader";
import DeleteModal from "../../../components/Organisms/Modal/Delete/DeleteModal";
import ShippingAddressModal from "../../../components/Organisms/Modal/Order/ShippingAddressModal";
import TableFilter from "../../../components/Organisms/Table/TableFilter/TableFilter";
import useDebounce from "../../../hooks/useDebounce";

import { IShippingAddress } from "../../../types/user.type";
import {
    useGetAllAdminsQuery,
    useDeleteAdminMutation,
} from "../../../redux/services/admin/adminApiService";

const AllSellers = () => {
    // state
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [deleteModal, setDeleteModal] = useState<{
        data: string | object | null;
        open: boolean;
    }>({
        data: null,
        open: false,
    });

    const [shippingAddressModal, setShippingAddressModal] = useState<{
        data: IShippingAddress | null;
        open: boolean;
    }>({
        data: null,
        open: false,
    });

    const debouncedValue = useDebounce({ searchQuery: searchTerm, delay: 600 });

    // search query parameter
    const queryParams = new URLSearchParams({
        page: JSON.stringify(page),
        limit: JSON.stringify(limit),
        searchTerm: debouncedValue,
    });

    const navigate = useNavigate();

    // redux api call
    const { data, isError, isLoading } = useGetAllAdminsQuery(
        queryParams.toString()
    );
    const [deleteAdmin, { isLoading: isDeleteLoading }] =
        useDeleteAdminMutation();

    // handle remove item
    const handleRemoveItem = (id: string) => {
        setDeleteModal({
            data: id,
            open: true,
        });
    };

    // handle Shipping item
    const handleShippingItem = (payload: IShippingAddress) => {
        setShippingAddressModal({
            data: payload,
            open: true,
        });
    };

    return (
        <>
            <div>
                <TableHeader
                    buttonName=""
                    buttonClassName={
                        "text-gray-800 hover:shadow-white/50 bg-white shadow-white/30 py-3 px-4"
                    }
                    className={"lg:mt-10 mt-5 mb-7"}
                    headerTitle={"All Sellers"}
                    onClick={() => navigate("/products/add-product")}
                    headerClassName={"text-white text-4xl font-bold mb-2"}
                    isAddButtonShow={false}
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
                        checkbox={true}
                        handleSelectedRowItem={() => console.log()}
                        columns={[
                            {
                                name: "Image",
                                dataIndex: "_id",
                                render: ({ item }) => (
                                    <div className="flex">
                                        {item?.profileImage ? (
                                            <AntdImage
                                                src={item?.profileImage}
                                                height={40}
                                                width={40}
                                                className={
                                                    "w-10 h-10 rounded-full"
                                                }
                                                alt={"buyer-image"}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                ),
                            },

                            {
                                name: "Full Name",
                                dataIndex: "name",
                                render: ({ item }) => (
                                    <span
                                        className={`text-lg min-w-max flex justify-center`}
                                    >
                                        {item?.name}
                                    </span>
                                ),
                            },
                            {
                                name: "Email",
                                dataIndex: "email",
                                render: ({ item }) => (
                                    <span
                                        className={`text-lg min-w-max flex justify-center`}
                                    >
                                        {item?.email}
                                    </span>
                                ),
                            },
                            {
                                name: "Shipping Address",
                                dataIndex: "orderedBy",
                                render: ({ item }) => (
                                    <div className="flex justify-center">
                                        <Button
                                            className={`text-white hover:shadow-blue-500/40 bg-blue-500 shadow-blue-500/20`}
                                            label={"See Shipping Address"}
                                            onClick={() =>
                                                handleShippingItem({
                                                    ...item?.shippingAddress,
                                                    modalName:
                                                        "Shipping Address",
                                                })
                                            }
                                        />
                                    </div>
                                ),
                            },
                            {
                                name: "Actions",
                                dataIndex: "actions",
                                render: ({ item }) => (
                                    <div className="flex space-x-2">
                                        <Button
                                            className={`text-white hover:shadow-red-500/40 bg-red-500 shadow-red-500/20`}
                                            label={<FaTrash />}
                                            onClick={() =>
                                                handleRemoveItem(item?._id)
                                            }
                                        />
                                    </div>
                                ),
                            },
                        ]}
                    />
                </div>
            </div>

            {/* delete product */}
            {shippingAddressModal.open ? (
                <ShippingAddressModal
                    isModalOpen={shippingAddressModal.open}
                    setIsModalOpen={setShippingAddressModal}
                    shippingAddressData={shippingAddressModal?.data}
                />
            ) : (
                ""
            )}
            {/* delete product */}
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
                    deleteActionMethod={deleteAdmin}
                    deletePayload={deleteModal?.data}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default AllSellers;
