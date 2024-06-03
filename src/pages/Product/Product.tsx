import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import Button from "../../components/Atoms/Button/Button";
import AntdImage from "../../components/Molecules/Image/Image";
import Table from "../../components/Molecules/Table/Table";
import TableFilter from "../../components/Organisms/Table/TableFilter/TableFilter";
import TableHeader from "../../components/Molecules/Table/TableHeader";
import useDebounce from "../../hooks/useDebounce";
import DeleteModal from "../../components/Organisms/Modal/Delete/DeleteModal";
import UpdateProduct from "../../components/Organisms/Form/Product/Update/UpdateProduct";

import {
    useGetProductsQuery,
    useRemovedProductMutation,
} from "../../redux/services/product/productApi";

const ProductPage = () => {
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
    const [updateModal, setUpdateModal] = useState<{
        data: string;
        open: boolean;
    }>({
        data: "",
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
    const { data, isError, isLoading } = useGetProductsQuery(
        queryParams.toString()
    );
    const [removedProduct, { isLoading: isDeleteLoading }] =
        useRemovedProductMutation();

    // handle remove item
    const handleRemoveItem = (id: string) => {
        setDeleteModal({
            data: id,
            open: true,
        });
    };

    const handleEditProduct = (id: string) => {
        setUpdateModal({
            data: id,
            open: true,
        });
    };

    return (
        <>
            <div>
                <TableHeader
                    buttonName="Add Product"
                    buttonClassName={
                        "text-gray-800 hover:shadow-white/50 bg-white shadow-white/30 py-3 px-4"
                    }
                    className={"lg:mt-10 mt-5 mb-7"}
                    headerTitle={"All Products"}
                    onClick={() => navigate("/products/add-product")}
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
                        checkbox={true}
                        handleSelectedRowItem={() => console.log()}
                        columns={[
                            {
                                name: "Image",
                                dataIndex: "_id",
                                render: ({ item }) => (
                                    <div className="flex">
                                        {item?.imageURLs?.length
                                            ? item?.imageURLs?.map(
                                                  (
                                                      img: string,
                                                      idx: number
                                                  ) => (
                                                      <AntdImage
                                                          key={idx}
                                                          src={img}
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
                                name: "Name",
                                dataIndex: "name",
                                key: "_id",
                            },
                            {
                                name: "Price",
                                dataIndex: "price",
                                key: "_id",
                            },
                            {
                                name: "Quantity",
                                dataIndex: "quantity",
                                key: "_id",
                            },
                            {
                                name: "Sold",
                                dataIndex: "sold",
                                key: "_id",
                            },
                            {
                                name: "Discount",
                                dataIndex: "discount",
                                key: "_id",
                            },
                            {
                                name: "Category",
                                dataIndex: "category",
                                dataIndex2: "name",
                                key: "_id",
                            },
                            {
                                name: "Brand",
                                dataIndex: "brand",
                                dataIndex2: "name",
                                key: "_id",
                            },
                            {
                                name: "IsFeatured",
                                dataIndex: "isFeatured",
                                render: ({ item }) => (
                                    <Button
                                        className={`text-white capitalize ${
                                            item.isFeatured
                                                ? "hover:shadow-green-500/40 bg-green-500 shadow-green-500/20 "
                                                : "hover:shadow-red-500/40 bg-red-500 shadow-red-500/20 "
                                        } `}
                                        label={item.isFeatured ? "Yes" : "No"}
                                    />
                                ),
                            },
                            {
                                name: "Status",
                                dataIndex: "status",
                                render: ({ item }) => (
                                    <Button
                                        className={`text-white capitalize ${
                                            item.status
                                                ? "hover:shadow-green-500/40 bg-green-500 shadow-green-500/20 "
                                                : "hover:shadow-red-500/40 bg-red-500 shadow-red-500/20 "
                                        } `}
                                        label={item.status}
                                    />
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
                                            onClick={() => handleEditProduct(item.slug)}
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
                    deleteActionMethod={removedProduct}
                    deletePayload={deleteModal?.data}
                />
            ) : (
                ""
            )}

            {/* update product */}
            {updateModal.open ? (
                <UpdateProduct
                    id={updateModal?.data}
                    isModalOpen={updateModal.open}
                    setIsModalOpen={setUpdateModal}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default ProductPage;
