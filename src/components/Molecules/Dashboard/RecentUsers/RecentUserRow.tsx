import { FaUserGraduate } from "react-icons/fa";
import { IUser } from "../../../../types/user.type";

interface RecentUserRowProps {
    user: IUser;
}

const RecentUserRow: React.FC<RecentUserRowProps> = ({ user }) => {
    const { name, profileImage, email } = user;

    return (
        <tr className="bg-white border-b hover:bg-gray-50 ">
            <td className="p-4">
            <span className="min-w-max flex justify-center">
            {profileImage ? (
                    <img
                        src={profileImage}
                        alt="Apple Watch"
                        className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300"
                    />
                ) : (
                    <FaUserGraduate className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300" />
                )}
                </span>
               
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 ">{name}</td>

            <td className="px-6 py-4 font-semibold text-gray-900 ">{email}</td>
        </tr>
    );
};

export default RecentUserRow;
