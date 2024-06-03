import { useNavigate } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { TbCategoryPlus } from "react-icons/tb";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { TbTextSize } from "react-icons/tb";
import { AiFillDashboard, AiFillSetting } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdLogout, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiCoupon4Line } from "react-icons/ri";

import SideBarListItem from "../../../Molecules/Sidebar/SidebarList/SideBarListItem/SideBarListItem";
import SideBarDropdownListItem from "../../../Molecules/Sidebar/SidebarList/SideBarDropdownListItem/SideBarDropdownListItem";

import { getUserInfo, removeUserInfo } from "../../../../store/user/users";
import { USER_ROLES } from "../../../../constants/role";
import { useOpenSetting } from "../../../../context/OpenSettingContext";

const SidebarList = () => {
    const {
        openSetting,
        setOpenSetting,
        openProduct,
        setOpenProduct,
        openUser,
        setOpenUser,
    } = useOpenSetting();

    const user = getUserInfo();
    const userInfo = user?.user;

    const navigate = useNavigate();

    const handleLogOut = () => {
        removeUserInfo();
        navigate("/login");
    };

    return (
        <ul className="space-y-2 px-3">
            <SideBarListItem navigationLink={"/"}>
                <AiFillDashboard className="h-[19px] w-[19px] text-green-400" />
                <span className="ml-3">Dashboard</span>
            </SideBarListItem>

            {userInfo?.role === USER_ROLES.admin && (
                <SideBarListItem navigationLink="/admin/orders">
                    <BsCartCheck className="h-[19px] w-[19px] text-green-400" />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                        Orders
                    </span>
                </SideBarListItem>
            )}

            <SideBarListItem navigationLink="/coupons">
                <RiCoupon4Line className="h-[19px] w-[19px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Coupons</span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/categories">
                <BiCategoryAlt className="h-[20px] w-[20px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Category</span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/sub-categories">
                <TbCategoryPlus className="h-[20px] w-[20px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                    SubCategory
                </span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/colors">
                <IoColorPaletteOutline className="h-[20px] w-[20px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Color</span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/sizes">
                <TbTextSize className="h-[21px] w-[21px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Size</span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/brands">
                <TbDiscountCheckFilled className="h-[21px] w-[21px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Brand</span>
            </SideBarListItem>
            <SideBarListItem
                open={openProduct}
                setOpen={setOpenProduct}
                icon={
                    <MdOutlineProductionQuantityLimits className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="Products"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/products"
                    name="My Products"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/products/add-product"
                    name="Add Product"
                />
            </SideBarListItem>
            {userInfo?.role === USER_ROLES.admin && (
                <SideBarListItem
                    open={openUser}
                    setOpen={setOpenUser}
                    icon={
                        <FaUsers className="h-[19px] w-[19px] text-green-400" />
                    }
                    dropdownMainMenuName="All Users"
                    isDropdownList
                >
                    <SideBarDropdownListItem
                        dropdownNavigationLink="/admin/sellers"
                        name="All Sellers"
                    />
                    <SideBarDropdownListItem
                        dropdownNavigationLink="/admin/buyers"
                        name="All Buyers"
                    />
                </SideBarListItem>
            )}

            <SideBarListItem
                open={openSetting}
                setOpen={setOpenSetting}
                icon={
                    <AiFillSetting className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="Profile Settings"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/setting/profile"
                    name="Profile"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/setting/address"
                    name="Address"
                />
            </SideBarListItem>

            <SideBarListItem isLabel>
                <MdLogout className="h-[19px] w-[19px] text-green-400" />

                <span
                    onClick={handleLogOut}
                    className="flex-1 ml-3 cursor-pointer whitespace-nowrap"
                >
                    LogOut
                </span>
            </SideBarListItem>
        </ul>
    );
};

export default SidebarList;
