import Login from "../../pages/Authentication/Login/Login";
import Register from "../../pages/Authentication/Register/Register";
import CouponPage from "../../pages/Coupon/Coupon";
import AddProductPage from "../../pages/Product/AddProduct";
import ProductPage from "../../pages/Product/Product";
import BrandPage from "../../pages/Admin/Brand/Brand";
import CategoriesPage from "../../pages/Admin/Category/Categories";
import ColorPage from "../../pages/Admin/Color/Color";
import SizePage from "../../pages/Admin/Size/Size";
import SubCategoryPage from "../../pages/Admin/SubCategory/SubCategory";
import AdminDashboard from "../../pages/Admin/AdminDashboard/AdminDashboard";
import SellerDashboard from "../../pages/Seller/SellerDashboard/SellerDashboard";
import ProfilePage from "../../pages/Profile/Profile";

import { getUserInfo } from "../../store/user/users";
import { USER_ROLES } from "../../constants/role";
import RoleBasedPrivateRouter from "../ProtectRoute/RoleBasedPrivateRouter";
import AddressPage from "../../pages/Profile/Address/Address";

const user = getUserInfo();
const userInfo = user?.user;
export const allCommonRoutes = {
    children: [
        {
            path: "/",
            element:
                userInfo?.role === USER_ROLES.admin ? (
                    <RoleBasedPrivateRouter role={USER_ROLES.admin}>
                        <AdminDashboard />
                    </RoleBasedPrivateRouter>
                ) : (
                    <RoleBasedPrivateRouter role={USER_ROLES.seller}>
                        <SellerDashboard />
                    </RoleBasedPrivateRouter>
                ),
        },
        {
            path: "/products",
            element: <ProductPage />,
        },
        {
            path: "/products/add-product",
            element: <AddProductPage />,
        },
        {
            path: "/coupons",
            element: <CouponPage />,
        },
        {
            path: "/sizes",
            element: <SizePage />,
        },
        {
            path: "/sub-categories",
            element: <SubCategoryPage />,
        },
        {
            path: "/brands",
            element: <BrandPage />,
        },
        {
            path: "/categories",
            element: <CategoriesPage />,
        },
        {
            path: "/colors",
            element: <ColorPage />,
        },
        // Start Profile Address
        {
            path: "/setting/profile",
            element: <ProfilePage />,
        },
        {
            path: "/setting/address",
            element: <AddressPage />,
        },
        // End Profile Address
    ],
    single: [
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
    ],
};
