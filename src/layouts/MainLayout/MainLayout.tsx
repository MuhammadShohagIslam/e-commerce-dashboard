import { useState, useSyncExternalStore } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../../components/Organisms/Navbar/Navbar";
import SidebarList from "../../components/Organisms/Sidebar/SidebarList/SidebarList";

const MainLayout = () => {
    const [openSideBar, setOpenSideBar] = useState<boolean>(true);

    useSyncExternalStore(
        (listener) => {
            window.addEventListener("resize", () => {
                if (window !== undefined) {
                    if (window.innerWidth > 520) {
                        setOpenSideBar(true);
                    } else {
                        setOpenSideBar(false);
                    }
                }
            });

            return () => window.removeEventListener("resize", listener);
        },
        () => window.innerWidth
    );

    return (
        <>
            <Navbar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
            <aside
                className={`w-72 fixed top-0 left-0 z-40  h-screen pt-[65px] duration-500 transition-all bg-white border-r border-gray-200 ${
                    openSideBar ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="h-full px-3 pt-4 pb-4 overflow-y-auto bg-white">
                    <SidebarList />
                </div>
            </aside>

            <section
                className={`pr-4 lg:pl-12 md:pl-4 pl-4 lg:ml-64 md:ml-0 ml-0 pt-20 relative`}
            >
                <div className="bg-green-400 h-80 left-0 right-0 fixed top-0 w-full -z-10"></div>
                <div className={`md:px-5 md:py-5 px-1 py-0`}>
                    <Outlet />
                </div>
            </section>
        </>
    );
};

export default MainLayout;
