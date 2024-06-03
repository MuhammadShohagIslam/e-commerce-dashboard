import { IShippingAddress } from "../../../../types/user.type";
import AntdModal from "../../../Atoms/Modal/AntdModal";

type ShippingAddressModalType = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<
        React.SetStateAction<{
            data: IShippingAddress | null;
            open: boolean;
        }>
    >;
    shippingAddressData: IShippingAddress | null;
};

const ShippingAddressModal = ({
    isModalOpen,
    setIsModalOpen,
    shippingAddressData,
}: ShippingAddressModalType) => {
    return (
        <AntdModal
            title={shippingAddressData?.modalName || ""}
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
                                "firstName",
                                "lastName",
                                "phoneNumber",
                                "address1",
                                "address1",
                                "city",
                                "country",
                                "postCode",
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
                        <tr className={`text-gray-600`}>
                            <td
                                className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                            >
                                <div className={`flex justify-center`}>
                                    <span className="text-nowrap">
                                        {shippingAddressData?.firstName}
                                    </span>
                                </div>
                            </td>
                            <td
                                className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                            >
                                <div className={`flex justify-center`}>
                                    <span className="text-nowrap">
                                        {shippingAddressData?.lastName}
                                    </span>
                                </div>
                            </td>
                            <td
                                className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                            >
                                <div className={`flex justify-center`}>
                                    <span className="text-nowrap">
                                        {shippingAddressData?.phoneNumber}
                                    </span>
                                </div>
                            </td>
                            <td
                                className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                            >
                                <div className={`flex justify-center`}>
                                    <span className="text-nowrap">
                                        {shippingAddressData?.address1}
                                    </span>
                                </div>
                            </td>
                            <td
                                className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                            >
                                <div className={`flex justify-center`}>
                                    <span className="text-nowrap">
                                        {shippingAddressData?.address2}
                                    </span>
                                </div>
                            </td>
                            <td
                                className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                            >
                                <div className={`flex justify-center`}>
                                    <span className="text-nowrap">
                                        {shippingAddressData?.city}
                                    </span>
                                </div>
                            </td>
                            <td
                                className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                            >
                                <div className={`flex justify-center`}>
                                    <span className="text-nowrap">
                                        {shippingAddressData?.country}
                                    </span>
                                </div>
                            </td>
                            <td
                                className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle `}
                            >
                                <div className={`flex justify-center`}>
                                    <span className="text-nowrap">
                                        {shippingAddressData?.postCode}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AntdModal>
    );
};

export default ShippingAddressModal;
