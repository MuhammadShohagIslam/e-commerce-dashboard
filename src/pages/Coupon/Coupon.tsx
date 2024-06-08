import dayjs from "dayjs";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import localizedFormat from "dayjs/plugin/localizedFormat";

import Button from "../../components/Atoms/Button/Button";
import Table from "../../components/Molecules/Table/Table";
import TableFilter from "../../components/Organisms/Table/TableFilter/TableFilter";
import useDebounce from "../../hooks/useDebounce";

import TableHeader from "../../components/Molecules/Table/TableHeader";
import CreateCoupon from "../../components/Organisms/Form/Coupon/Create/CreateCoupon";
import UpdateCoupon from "../../components/Organisms/Form/Coupon/Update/UpdateCoupon";
import DeleteModal from "../../components/Organisms/Modal/Delete/DeleteModal";
import MetaTag from "../../utils/MetaTag";

import {
    useGetCouponsQuery,
    useRemovedCouponMutation,
} from "../../redux/services/coupon/couponApi";
import { ICoupon } from "../../types/coupon.types";

const CouponPage = () => {
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
        data: ICoupon | null;
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
    const { data, isError, isLoading } = useGetCouponsQuery(
        queryParams.toString()
    );
    const [removedCoupon, { isLoading: isDeleteLoading }] =
        useRemovedCouponMutation();

    // handle remove item
    const handleRemoveItem = (id: string) => {
        setDeleteModal({
            data: id,
            open: true,
        });
    };

    // handle edit item
    const handleEditItem = (item: ICoupon) => {
        setUpdateModal({
            data: item,
            open: true,
        });
    };

    // handle add item
    const handleAddCoupon = () => {
        setIsModalOpen((prev) => !prev);
    };

    dayjs.extend(localizedFormat);

    return (
        <>
            <MetaTag
                title="Coupons"
                description="Manage your discount coupons on Aladin. Create, edit, delete and organize your promotional offers to enhance customer engagement and sales."
            />

            <div>
                <TableHeader
                    buttonName="Add Coupon"
                    buttonClassName={
                        "text-gray-800 hover:shadow-white/50 bg-white shadow-white/30 py-3 px-4"
                    }
                    className={"lg:mt-10 mt-5 mb-7"}
                    headerTitle={"All Coupon"}
                    onClick={() => handleAddCoupon()}
                    headerClassName={
                        "text-white md:text-4xl text-2xl  font-bold mb-2"
                    }
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
                                name: "Code",
                                dataIndex: "code",
                                key: "_id",
                            },
                            {
                                name: "Discount",
                                dataIndex: "discountAmount",
                                key: "_id",
                            },
                            {
                                name: "Expire",
                                dataIndex: "expiresAt",
                                render: ({ item }) => (
                                    <span>
                                        {dayjs(item.expiresAt).format("llll")}
                                    </span>
                                ),
                            },

                            {
                                name: "Uses",
                                dataIndex: "uses",
                                render: ({ item }) => <span>{item.uses}</span>,
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

            {/* create Coupon */}
            {isModalOpen ? (
                <CreateCoupon
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            ) : (
                ""
            )}

            {/* delete Coupon */}
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
                    deleteActionMethod={removedCoupon}
                    deletePayload={deleteModal?.data}
                />
            ) : (
                ""
            )}

            {/* update Coupon */}
            {updateModal.open ? (
                <UpdateCoupon
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

export default CouponPage;
