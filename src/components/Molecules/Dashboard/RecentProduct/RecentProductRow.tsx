import { IProduct } from "../../../../types/product.type";

interface RecentProductRowProps {
    product: IProduct;
}

const RecentProductRow: React.FC<RecentProductRowProps> = ({ product }) => {
    const { name, imageURLs, price } = product;

    return (
        <tr className="bg-white border-b hover:bg-gray-50 ">
            <td className="p-4">
                <span className="min-w-max flex justify-center">
                    {imageURLs.length && (
                        <img
                            src={imageURLs?.[0]}
                            alt={name}
                            className="w-8 h-8 p-1 rounded-full ring-2 ring-green-300"
                        />
                    )}
                </span>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 ">{name?.length > 16
                                    ? name.slice(0, 16) + "..."
                                    : name}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 ">${price}</td>
        </tr>
    );
};

export default RecentProductRow;
