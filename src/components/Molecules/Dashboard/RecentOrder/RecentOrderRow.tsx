import { MdOutlineVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";

import { IOrder } from "../../../../types/order.types";

interface RecentOrderRowProps {
    order: IOrder;
}

const RecentOrderRow: React.FC<RecentOrderRowProps> = ({ order }) => {
    const { orderedBy, paymentIntents, trackingInfo, paymentBy } = order;

    return (
        <tr className="bg-white border-b hover:bg-gray-50 ">
            <td scope="row" className="w-32 p-4">
                <span className="min-w-max flex justify-center">
                    {orderedBy?.name}
                </span>
            </td>
            <td scope="row" className="px-6 py-4 font-semibold text-gray-900 ">
                <span className="min-w-max flex">
                    ${paymentIntents.amount / 100}
                </span>
            </td>

            <td scope="row" className="px-6 py-4 font-semibold text-gray-900">
                <span
                    className={`text-lg min-w-max flex justify-center ${
                        paymentIntents.status === "succeeded"
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                >
                    {paymentIntents.status === "succeeded" ? (
                        <MdOutlineVerified />
                    ) : (
                        <VscUnverified />
                    )}
                </span>
            </td>
            <td scope="row" className="px-6 py-4 font-semibold text-gray-900 ">
                <span className="min-w-max flex justify-center">
                    {paymentBy ? paymentBy : "Null"}
                </span>
            </td>
            <td scope="row" className="px-6 py-4 font-semibold text-gray-900 ">
                <span
                    className={`min-w-max flex bg-gradient-to-br ${
                        trackingInfo?.title === "ordered"
                            ? "from-green-500"
                            : trackingInfo?.title === "shipped"
                            ? "from-blue-500"
                            : trackingInfo?.title === "delivered"
                            ? "from-green-600"
                            : "from-green-500"
                    }  to-voilet-500 px-3.6 text-xs rounded-1.8 py-2.5 px-4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white`}
                >
                    {trackingInfo?.title}
                </span>
            </td>
        </tr>
    );
};

export default RecentOrderRow;
