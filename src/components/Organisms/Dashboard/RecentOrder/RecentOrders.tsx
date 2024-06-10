import { Link } from "react-router-dom";

import TableSkeleton from "../../../Molecules/Skeletons/TableSkeleton/TableSkeleton";
import Empty from "../../../Molecules/Empty";
import RecentOrderRow from "../../../Molecules/Dashboard/RecentOrder/RecentOrderRow";

import { IOrder } from "../../../../types/order.types";

interface RecentOrderProps {
    orders: IOrder[];
    isLoading: boolean;
}

const RecentOrder: React.FC<RecentOrderProps> = ({
    orders,
    isLoading = false,
}) => {
    let content = null;

    // check if data not available
    if (orders?.length) {
        content = orders.map((order) => (
            <RecentOrderRow key={order?._id} order={order} />
        ));
    }

    if (!orders?.length) {
        content = (
            <tr className={`text-gray-600 text-center`}>
                <td className="py-11 text-xl" colSpan={5}>
                    <Empty />
                </td>
            </tr>
        );
    }

    // check if data not available
    if (isLoading) {
        content = <TableSkeleton rowLength={4} colLength={5} />;
    }

    return (
        <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl shadow-md  rounded-2xl bg-clip-border ">
            <div className="flex justify-between px-4 py-3">
                <div>
                    <h6 className="text-gray-900 text-lg font-bold">
                        Recent Orders
                    </h6>
                </div>
                <div className="text-gray-500 text-sm font-bold hover:text-green-500 transition-all cursor-pointer">
                    <Link to="/admin/orders">View All</Link>
                </div>
            </div>
            <div className="relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Payment Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Payment Method
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>{content}</tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrder;
