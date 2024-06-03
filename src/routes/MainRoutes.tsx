import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";
import PrivateRouter from "./ProtectRoute/PrivateRouter";

import { allAdminRoutes } from "./Admin/index.routes";
import { allCommonRoutes } from "./Common/index.routes";

const mainRoutes = createBrowserRouter([
    {
        path: "/",
        element: (
            <PrivateRouter>
                <MainLayout />
            </PrivateRouter>
        ),
        children: [
            ...allCommonRoutes.children,
            {
                path: "/admin",
                children: [...allAdminRoutes],
            },
        ],
    },
    ...allCommonRoutes.single,
]);

export default mainRoutes;
