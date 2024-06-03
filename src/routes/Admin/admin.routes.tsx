import AllOrders from "../../pages/Admin/Order/Order";
import AllBuyers from "../../pages/Admin/Users/AllBuyers";
import AllSellers from "../../pages/Admin/Users/AllSellers";
import RoleBasedPrivateRouter from "../ProtectRoute/RoleBasedPrivateRouter";

import { USER_ROLES } from "../../constants/role";

export const adminSingleRoutes = [
    {
        path: "orders",
        element: (
            <RoleBasedPrivateRouter role={USER_ROLES.admin}>
                <AllOrders />
            </RoleBasedPrivateRouter>
        ),
    },
    {
        path: "buyers",
        element: (
            <RoleBasedPrivateRouter role={USER_ROLES.admin}>
                <AllBuyers />
            </RoleBasedPrivateRouter>
        ),
    },
    {
        path: "sellers",
        element: (
            <RoleBasedPrivateRouter role={USER_ROLES.admin}>
                <AllSellers />
            </RoleBasedPrivateRouter>
        ),
    },
];
