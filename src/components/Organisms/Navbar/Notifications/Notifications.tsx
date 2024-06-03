import { GrOverview } from "react-icons/gr";

import Notification from "../../../Molecules/Navbar/Notifications/Notification";

import { notificationsData } from "../../../../data/notifications";

const Notifications = ({ showNotification }: { showNotification: boolean }) => {
    return (
        <div
            className={`z-50 absolute origin-top-right transition-all top-6 max-w-lg lg:w-96 w-60 max-h-[80vh] right-0 overflow-y-auto my-4 overflow-hidden text-base list-none bg-white divide-y divide-gray-100 rounded  shadow-lg shadow-gray-200 ${
                showNotification ? "scale-100" : "scale-0"
            } scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-gray-100`}
        >
            <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 ">
                Notifications
            </div>
            <div>
                <>
                    {notificationsData?.length &&
                        notificationsData.map((notification, i: number) => (
                            <Notification key={i} notification={notification} />
                        ))}
                </>
            </div>
            <a
                href="#"
                className="block py-2 text-base font-normal text-center text-gray-900 bg-gray-50 hover:bg-gray-100 "
            >
                <div className="inline-flex items-center ">
                    <GrOverview className="mr-1" />
                    View all
                </div>
            </a>
        </div>
    );
};

export default Notifications;
