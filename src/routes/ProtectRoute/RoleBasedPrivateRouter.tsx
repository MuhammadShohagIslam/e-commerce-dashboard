import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserInfo } from "../../store/user/users";

interface RoleBasedPrivateRouterProps {
    role: string;
    children: ReactNode;
}

const RoleBasedPrivateRouter = ({
    role,
    children,
}: RoleBasedPrivateRouterProps) => {
    const user = getUserInfo();
    const userInfo = user?.user;

    const location = useLocation();

    if (userInfo?.role === role) {
        return <>{children}</>;
    }

    return <Navigate to="/login" state={{ from: location }} replace={true} />;
};

export default RoleBasedPrivateRouter;
