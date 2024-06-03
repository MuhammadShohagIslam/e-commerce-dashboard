import { Link } from "react-router-dom";

import TableSkeleton from "../../../Molecules/Skeletons/TableSkeleton/TableSkeleton";
import Empty from "../../../Molecules/Empty";
import RecentProductRow from "../../../Molecules/Dashboard/RecentProduct/RecentProductRow";

import { IProduct } from "../../../../types/product.type";
import { useOpenSetting } from "../../../../context/OpenSettingContext";

interface RecentProductProps {
    products: IProduct[];
    isLoading: boolean;
}

const RecentProduct: React.FC<RecentProductProps> = ({
    products = [],
    isLoading = false,
}) => {
    const { setOpenProduct } = useOpenSetting();

    let content = null;

    // check if data not available
    if (products?.length) {
        content = products?.map((product) => (
            <RecentProductRow key={product?._id} product={product} />
        ));
    }

    if (!products?.length) {
        content = (
            <tr className={`text-gray-600 text-center`}>
                <td className="py-11 text-xl" colSpan={3}>
                    <Empty />
                </td>
            </tr>
        );
    }

    // check if data not available
    if (isLoading) {
        content = <TableSkeleton rowLength={4} colLength={3} />;
    }

    return (
        <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl shadow-md  rounded-2xl bg-clip-border">
            <div className="flex justify-between px-4 py-3">
                <div>
                    <h6 className="text-gray-900 text-lg font-bold">
                        Recent Products
                    </h6>
                </div>
                <div
                    onClick={() => setOpenProduct((prev) => !prev)}
                    className="text-gray-500 text-sm font-bold hover:text-green-500 transition-all cursor-pointer"
                >
                    <Link to="/products">View All</Link>
                </div>
            </div>
            <div className="relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>{content}</tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentProduct;
