import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";

import Button from "../../../components/Atoms/Button/Button";
import AntdImage from "../../../components/Molecules/Image/Image";
import Table from "../../../components/Molecules/Table/Table";
import TableFilter from "../../../components/Organisms/Table/TableFilter/TableFilter";
import TableHeader from "../../../components/Molecules/Table/TableHeader";
import ShippingAddressModal from "../../../components/Organisms/Modal/Order/ShippingAddressModal";
import useDebounce from "../../../hooks/useDebounce";
import DeleteModal from "../../../components/Organisms/Modal/Delete/DeleteModal";
import ProductDetailModal from "../../../components/Organisms/Modal/Order/ProductDetailModal";
import MetaTag from "../../../utils/MetaTag";

import {
    useGetOrdersQuery,
    useRemovedOrderMutation,
    useUpdateOrderStatusMutation,
} from "../../../redux/services/order/orderApi";
import { IProduct, OrderProductType } from "../../../types/product.type";
import { IShippingAddress } from "../../../types/user.type";

const AllOrders = () => {
    // state
    const [showOrderStatus, setShowOrderStatus] = useState<{
        open: boolean;
        id: string;
    }>({
        open: false,
        id: "",
    });
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

    const [productsModal, setProductsModal] = useState<{
        data: OrderProductType[] | null;
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
        populate: "products.product,orderedBy",
    });

    const navigate = useNavigate();

    // redux api call
    const { data, isError, isLoading } = useGetOrdersQuery(
        queryParams.toString()
    );
    const [removedOrder, { isLoading: isDeleteLoading }] =
        useRemovedOrderMutation();
    const [updateOrderStatus, { isLoading: updateOrderStatusLoading }] =
        useUpdateOrderStatusMutation();

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

    // handle Shipping item
    const handleBillingItem = (payload: IShippingAddress) => {
        setShippingAddressModal({
            data: payload,
            open: true,
        });
    };

    // handle products item
    const handleProductItem = (payload: OrderProductType[]) => {
        setProductsModal({
            data: payload,
            open: true,
        });
    };

    // order status change
    const changeOrderStatus = async ({
        id,
        status,
    }: {
        id: string;
        status: string;
    }) => {
        if (id !== "" && status !== "") {
            const payload = {
                id: id,
                data: {
                    trackingInfo: { title: status },
                    orderHistory: { status: status },
                },
            };
            const result = await updateOrderStatus(payload);

            // check if the request was successful
            if ("data" in result && result.data && result.data?.success) {
                setShowOrderStatus((prev) => ({
                    ...prev,
                    open: !prev.open,
                    id: "",
                }));
            } else {
                toast.error("Update Order Status Update Failed !");
            }
        }
    };

    return (
        <>
            <MetaTag
                title="Orders"
                description="View and manage orders on Aladin. Monitor order status, process payments, and ensure timely delivery to provide excellent customer service."
            />

            <div>
                <TableHeader
                    buttonName=""
                    buttonClassName={
                        "text-gray-800 hover:shadow-white/50 bg-white shadow-white/30 py-3 px-4"
                    }
                    className={"lg:mt-10 mt-5 mb-7"}
                    headerTitle={"All Orders"}
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
                                        {item?.products?.length
                                            ? item?.products?.map(
                                                  ({
                                                      product,
                                                      _id,
                                                  }: {
                                                      product: IProduct;
                                                      _id: string;
                                                  }) => (
                                                      <AntdImage
                                                          key={_id}
                                                          src={
                                                              product
                                                                  ?.imageURLs?.[0]
                                                          }
                                                          height={40}
                                                          width={40}
                                                          className={
                                                              "w-10 h-10 rounded-full"
                                                          }
                                                          alt={"product-image"}
                                                      />
                                                  )
                                              )
                                            : ""}
                                    </div>
                                ),
                            },

                            {
                                name: "Payment Amount",
                                dataIndex: "paymentIntents",
                                render: ({ item }) => (
                                    <span
                                        className={`text-lg min-w-max flex justify-center`}
                                    >
                                        ${item?.paymentIntents?.amount / 100}
                                    </span>
                                ),
                            },
                            {
                                name: "Order Date",
                                dataIndex: "paymentIntents",
                                render: ({ item }) => (
                                    <span
                                        className={`text-lg min-w-max flex justify-center`}
                                    >
                                        {Math.ceil(
                                            Math.log(
                                                item?.paymentIntents?.created +
                                                    1
                                            ) / Math.LN10
                                        ) >= 11 ? (
                                            <>
                                                {new Date(
                                                    Math.floor(
                                                        item?.paymentIntents
                                                            ?.created / 1000
                                                    ) * 1000
                                                ).toLocaleString()}
                                            </>
                                        ) : (
                                            <>
                                                {new Date(
                                                    item?.paymentIntents
                                                        ?.created * 1000
                                                ).toLocaleString()}
                                            </>
                                        )}
                                    </span>
                                ),
                            },
                            {
                                name: "Payment By",
                                dataIndex: "paymentBy",
                                render: ({ item }) => (
                                    <Button
                                        className={`text-white capitalize ${
                                            item?.paymentBy
                                                ? "hover:shadow-green-500/40 bg-green-500 shadow-green-500/20 "
                                                : "hover:shadow-red-500/40 bg-red-500 shadow-red-500/20 "
                                        } `}
                                        label={item?.paymentBy}
                                    />
                                ),
                            },
                            {
                                name: "Payment Currency",
                                dataIndex: "paymentIntents",
                                render: ({ item }) => (
                                    <span
                                        className={`text-lg min-w-max flex justify-center`}
                                    >
                                        {item?.paymentIntents?.currency}
                                    </span>
                                ),
                            },
                            {
                                name: "Payment Status",
                                dataIndex: "paymentIntents",
                                render: ({ item }) => (
                                    <span
                                        className={`text-lg min-w-max flex justify-center ${
                                            item?.paymentIntents.status ===
                                            "succeeded"
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {item?.paymentIntents.status ===
                                        "succeeded" ? (
                                            <MdOutlineVerified />
                                        ) : (
                                            <VscUnverified />
                                        )}
                                    </span>
                                ),
                            },
                            {
                                name: "OrderStatus",
                                dataIndex: "trackingInfo",
                                render: ({ item }) => (
                                    <div className="relative">
                                        <Button
                                            className={`text-white capitalize ${
                                                item?.trackingInfo?.title
                                                    ? "hover:shadow-green-500/40 bg-green-500 shadow-green-500/20 "
                                                    : "hover:shadow-red-500/40 bg-red-500 shadow-red-500/20 "
                                            } `}
                                            label={item?.trackingInfo?.title}
                                            onClick={() =>
                                                setShowOrderStatus((prev) => ({
                                                    ...prev,
                                                    open: !prev.open,
                                                    id: item?._id,
                                                }))
                                            }
                                        />
                                        <div
                                            className={`z-50 absolute origin-top-left transition-all top-8 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 ${
                                                showOrderStatus?.id ==
                                                    item?._id &&
                                                showOrderStatus.open
                                                    ? "scale-100"
                                                    : "scale-0"
                                            } `}
                                        >
                                            {updateOrderStatusLoading ? (
                                                <div className="flex justify-center items-center h-20">
                                                    <h2 className="text-md font-normal capitalize py-1 cursor-pointer hover:text-green-500 transition-all">
                                                        Updating Status...
                                                    </h2>
                                                </div>
                                            ) : (
                                                <ul className="py-2 px-4 text-sm text-gray-700 ">
                                                    {item?.orderHistory?.map(
                                                        (
                                                            order: {
                                                                status: string;
                                                            },
                                                            index: number
                                                        ) => (
                                                            <li
                                                                onClick={() =>
                                                                    changeOrderStatus(
                                                                        {
                                                                            status: order?.status,
                                                                            id: item?._id,
                                                                        }
                                                                    )
                                                                }
                                                                className="text-md font-normal capitalize py-1 cursor-pointer hover:text-green-500 transition-all"
                                                                key={index}
                                                            >
                                                                {order?.status}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                ),
                            },
                            {
                                name: "Products",
                                dataIndex: "products",
                                render: ({ item }) => (
                                    <div className="flex justify-center">
                                        <Button
                                            className={`text-white hover:shadow-blue-500/40 bg-blue-500 shadow-blue-500/20`}
                                            label={"See Products"}
                                            onClick={() =>
                                                handleProductItem(
                                                    item?.products
                                                )
                                            }
                                        />
                                    </div>
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
                                                    ...item?.orderedBy
                                                        ?.shippingAddress,
                                                    modalName:
                                                        "Shipping Address",
                                                })
                                            }
                                        />
                                    </div>
                                ),
                            },
                            {
                                name: "Billing Address",
                                dataIndex: "billingAddress",
                                render: ({ item }) => (
                                    <div className="flex justify-center">
                                        <Button
                                            className={`text-white hover:shadow-blue-500/40 bg-blue-500 shadow-blue-500/20`}
                                            label={"See Billing Address"}
                                            onClick={() =>
                                                handleBillingItem({
                                                    ...item?.billingAddress,
                                                    modalName:
                                                        "Billing Address",
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
            {productsModal.open ? (
                <ProductDetailModal
                    isModalOpen={productsModal.open}
                    setIsModalOpen={setProductsModal}
                    modalData={productsModal?.data}
                />
            ) : (
                ""
            )}

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
                    deleteActionMethod={removedOrder}
                    deletePayload={deleteModal?.data}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default AllOrders;
