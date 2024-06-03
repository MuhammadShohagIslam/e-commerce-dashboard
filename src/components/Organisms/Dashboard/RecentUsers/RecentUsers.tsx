import { Link } from "react-router-dom";

import TableSkeleton from "../../../Molecules/Skeletons/TableSkeleton/TableSkeleton";
import Empty from "../../../Molecules/Empty";
import RecentUserRow from "../../../Molecules/Dashboard/RecentUsers/RecentUserRow";

import { IUser } from "../../../../types/user.type";
import { useOpenSetting } from "../../../../context/OpenSettingContext";

interface RecentUsersProps {
    users: IUser[];
    isLoading: boolean;
}

const RecentUsers: React.FC<RecentUsersProps> = ({
    users = [],
    isLoading = false,
}) => {
    const { setOpenUser } = useOpenSetting();

    let content = null;

    // check if data not available
    if (users?.length) {
        content = users?.map((user) => (
            <RecentUserRow key={user?._id} user={user} />
        ));
    }

    if (!users?.length) {
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
        content = <TableSkeleton rowLength={3} colLength={3} />;
    }

    return (
        <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl shadow-md  rounded-2xl bg-clip-border ">
            <div className="flex justify-between px-4 py-3">
                <div>
                    <h6 className="text-gray-900 text-lg font-bold">
                        Recent Users
                    </h6>
                </div>
                <div
                    onClick={() => setOpenUser((prev) => !prev)}
                    className="text-gray-500 text-sm font-bold hover:text-green-500 transition-all cursor-pointer"
                >
                    <Link to="/admin/buyers">View All</Link>
                </div>
            </div>
            <div className="relative overflow-x-auto sm:rounded-lg scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-gray-100">
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
                                Email
                            </th>
                        </tr>
                    </thead>
                    <tbody>{content}</tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentUsers;
