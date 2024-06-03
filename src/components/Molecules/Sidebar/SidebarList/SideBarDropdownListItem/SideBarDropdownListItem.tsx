import { Link, useLocation } from "react-router-dom";

type SideBarDropdownListItemPropType = {
    dropdownNavigationLink: string;
    name: string;
};
const SideBarDropdownListItem: React.FC<SideBarDropdownListItemPropType> = ({
    dropdownNavigationLink,
    name,
}) => {
    const location = useLocation();
    return (
        <li
            className={
                location.pathname == dropdownNavigationLink
                    ? "bg-gray-100 rounded-lg"
                    : ""
            }
        >
            <Link
                to={dropdownNavigationLink}
                className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 "
            >
                {name}
            </Link>
        </li>
    );
};

export default SideBarDropdownListItem;
