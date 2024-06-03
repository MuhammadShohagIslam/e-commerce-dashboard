import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { MdLogout } from "react-icons/md";

import Notifications from "./Notifications/Notifications";
import Logo from "../../../assets/images/logo-big.png";

import { getUserInfo, removeUserInfo } from "../../../store/user/users";
import { useOpenSetting } from "../../../context/OpenSettingContext";

type NavbarPropsType = {
    openSideBar: boolean;
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ openSideBar, setOpenSideBar }: NavbarPropsType) => {
    const [showNotification, setShowNotification] = useState(false);
    const [showProfile, setShowProfile] = useState<boolean>(false);
    const { setOpenSetting } = useOpenSetting();

    const userInfo = getUserInfo();
    const user = userInfo?.user;

    const navigate = useNavigate();

    const handleLogOut = () => {
        removeUserInfo();
        navigate("/login");
    };

    return (
        <nav className="bg-white fixed top-0 z-50 w-full border-b border-gray-200 py-3">
            <div className="px-8 flex lg:justify-between md:justify-between justify-none">
                <div className="lg:w-1/4 md:w-1/4 w-2/3 flex">
                    <button
                        onClick={() => setOpenSideBar(!openSideBar)}
                        type="button"
                        className="items-center text-sm text-green-500 rounded-lg lg:hidden md:inline-flex  inline-flex  hover:bg-transparent focus:outline-none focus:ring-0 focus:ring-gray-200 mr-2 "
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                            ></path>
                        </svg>
                    </button>
                    <Link
                        to="/"
                        className="text-green-400 font-bold text-3xl sm:text-xl"
                    >
                        <img src={Logo} alt="logo" className="lg:w-[60%] md:w-[88%] w-[89%] h-full" />
                    </Link>
                </div>

                <form className="w-1/2 lg:block md:block hidden">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full h-10 pl-10 pr-4 text-sm text-green-400 border border-green-400 rounded-lg bg-white focus:outline-offset-4 focus:outline-1 focus:outline-green-400 focus:ring-green-300"
                            placeholder="Search Anything"
                            required
                        />
                    </div>
                </form>

                <div className="flex items-center justify-end md:w-1/4 w-[34%] space-x-4">
                    <div
                        className="relative top-1"
                        onMouseOver={() => setShowNotification(true)}
                        onMouseLeave={() => setShowNotification(false)}
                    >
                        <button className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            <span className="h-3 w-3 absolute top-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                            </span>
                        </button>
                        <Notifications showNotification={showNotification} />
                    </div>

                    <div>
                        <label
                            className="avatar cursor-pointer"
                            onClick={() => setShowProfile((prev) => !prev)}
                        >
                            <div className="w-8 rounded-full">
                                <div className="relative">
                                    {user && user?.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt={"admin profile logo"}
                                        />
                                    ) : (
                                        <FaUserGraduate className="w-8 h-8 text-gray-900 p-1 rounded-full ring-2 ring-green-400" />
                                    )}

                                    <ul
                                        className={` mt-2 z-50 absolute origin-top transition-all top-7 max-w-lg w-72 max-h-[80vh] right-0 overflow-y-auto my-4 overflow-hidden text-base list-none bg-white divide-y divide-gray-100 rounded  shadow-lg shadow-gray-200 ${
                                            showProfile
                                                ? "scale-100"
                                                : "scale-0"
                                        } pb-2 shadow bg-white drop-shadow-2xl rounded divide-y divide-gray-100  `}
                                    >
                                        <div className="py-3 w-72 px-4   ">
                                            <div className="break-all text-md text-black font-semibold">
                                                {user?.name}
                                            </div>
                                            <div className="font-medium text-sm break-all text-gray-500">
                                                {user && user?.email}
                                            </div>
                                        </div>
                                        <ul className="text-sm text-gray-700">
                                            <li>
                                                <Link
                                                    to="/"
                                                    className="flex  py-2 px-4 hover:bg-gray-100 text-gray-600  transition duration-75"
                                                >
                                                    <AiFillDashboard className="text-green-300 mr-1 mt-[3px]" />
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li
                                                onClick={() =>
                                                    setOpenSetting(
                                                        (prev) => !prev
                                                    )
                                                }
                                            >
                                                <Link
                                                    to="/setting/profile"
                                                    className="flex py-2 px-4 hover:bg-gray-100 text-gray-600 transition duration-75 "
                                                >
                                                    <FaUser className="text-green-300 mr-1 mt-[3px]" />
                                                    Profile
                                                </Link>
                                            </li>
                                        </ul>
                                        <div>
                                            <label
                                                onClick={handleLogOut}
                                                className="flex items-center justify-center py-2 px-4 hover:bg-gray-100 cursor-pointer text-gray-600 transition duration-75"
                                            >
                                                <MdLogout className="mr-1 text-green-300" />
                                                Sign out
                                            </label>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
