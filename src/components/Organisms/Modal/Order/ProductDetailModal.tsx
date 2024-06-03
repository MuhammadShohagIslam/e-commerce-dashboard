import AntdModal from "../../../Atoms/Modal/AntdModal";
import AntdImage from "../../../Molecules/Image/Image";

import { OrderProductType } from "../../../../types/product.type";

type ProductDetailModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<
        React.SetStateAction<{
            data: OrderProductType[] | null;
            open: boolean;
        }>
    >;
    modalData: OrderProductType[] | null;
};

const ProductDetailModal = ({
    isModalOpen,
    setIsModalOpen,
    modalData,
}: ProductDetailModalProps) => {
    return (
        <AntdModal
            title={"Products"}
            isModalOpen={isModalOpen}
            onCancel={() =>
                setIsModalOpen((prev) => ({
                    ...prev,
                    data: null,
                    open: false,
                }))
            }
            modalWidth={800}
        >
            <div className="relative overflow-x-auto rounded-lg scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-gray-100">
                <table className="w-full inline-table border-collapse table-auto text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr className="text-sm">
                            {[
                                "Images",
                                "Count",
                                "Name",
                                "Price",
                                "Quantity",
                                "Sold",
                                "Category",
                                "Brand",
                            ]?.map((column, index) => (
                                <th
                                    key={index}
                                    className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                >
                                    <div
                                        className={`flex items-center gap-1 text-primary capitalize font-medium justify-items-center`}
                                    >
                                        <span className="relative text-[13px] font-medium">
                                            {column}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {modalData?.map((data) => (
                            <tr key={data?._id} className={`text-gray-600`}>
                                <td
                                    className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                                >
                                    <div className="flex">
                                        {data?.product?.imageURLs?.length
                                            ? data?.product?.imageURLs?.map(
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
                                </td>
                                <td
                                    className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                                >
                                    <div className={`flex justify-center`}>
                                        <span className="text-nowrap">
                                            {data?.count}
                                        </span>
                                    </div>
                                </td>
                                <td
                                    className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                                >
                                    <div className={`flex justify-center`}>
                                        <span className="text-nowrap">
                                            {data?.product?.name}
                                        </span>
                                    </div>
                                </td>
                                <td
                                    className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                                >
                                    <div className={`flex justify-center`}>
                                        <span className="text-nowrap">
                                            {data?.price}
                                        </span>
                                    </div>
                                </td>

                                <td
                                    className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                                >
                                    <div className={`flex justify-center`}>
                                        <span className="text-nowrap">
                                            {data?.product?.quantity}
                                        </span>
                                    </div>
                                </td>
                                <td
                                    className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                                >
                                    <div className={`flex justify-center`}>
                                        <span className="text-nowrap">
                                            {data?.product?.sold}
                                        </span>
                                    </div>
                                </td>
                                <td
                                    className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                                >
                                    <div className={`flex justify-center`}>
                                        <span className="text-nowrap">
                                            {data?.product?.category?.name}
                                        </span>
                                    </div>
                                </td>
                                <td
                                    className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                                >
                                    <div className={`flex justify-center`}>
                                        <span className="text-nowrap">
                                            {data?.product?.brand?.name}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AntdModal>
    );
};

export default ProductDetailModal;
