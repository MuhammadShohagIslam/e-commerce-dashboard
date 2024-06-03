import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserInfo } from "../../store/user/users";
import { USER_ROLES } from "../../constants/role";

interface PrivateRouterProps {
    children: ReactNode;
}

const PrivateRouter = ({ children }: PrivateRouterProps) => {
    const user = getUserInfo();
    const userInfo = user?.user;
    const location = useLocation();

    if (
        userInfo?.role === USER_ROLES?.admin ||
        userInfo?.role === USER_ROLES?.seller
    ) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace={true} />;
};

export default PrivateRouter;
