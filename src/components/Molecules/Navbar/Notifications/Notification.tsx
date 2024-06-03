import React from "react";
import { Link } from "react-router-dom";

interface NotificationProps {
    notification: {
        image: string;
        message: string;
        user: string;
        date: string;
    };
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
    const { image, message, user, date } = notification;

    return (
        <Link
            to="#"
            className="flex sm:flex-col sm:items-center px-4 py-3 border-b hover:bg-gray-100"
        >
            <div className="flex-shrink-0">
                <img
                    className="rounded-full w-11 h-11"
                    src={image}
                    alt={user}
                />
            </div>
            <div className="w-full pl-3">
                <div className="text-gray-500 font-normal text-sm mb-1.5">
                    New message from{" "}
                    <span className="font-semibold text-gray-900">{user}</span>{" "}
                    {message}
                </div>
                <div className="text-xs font-medium text-green-400">{date}</div>
            </div>
        </Link>
    );
};

export default Notification;
