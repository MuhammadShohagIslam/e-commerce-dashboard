const TableSkeleton = ({
    rowLength,
    colLength,
}: {
    rowLength: number;
    colLength: number;
}) => {
    return (
        <>
            {Array.from({ length: rowLength }, (_, idx) => (
                <tr key={idx} className="bg-white">
                    {Array.from({ length: colLength }, (_, idx) => (
                        <td
                            key={idx}
                            className="p-4 border-b border-blue-gray-50"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-200 rounded-full animate-pulse "></div>
                                <div className="flex flex-col">
                                    <div className="w-24 h-4 bg-green-200 rounded animate-pulse "></div>
                                    <div className="w-24 h-3 bg-green-200 rounded animate-pulse  mt-2"></div>
                                </div>
                            </div>
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
};

export default TableSkeleton;
