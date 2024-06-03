import { AiOutlineUserAdd } from "react-icons/ai";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { SlHandbag } from "react-icons/sl";

import DashWidget from "../../../components/Molecules/Dashboard/DashWidget/DashWidget";
import RecentOrder from "../../../components/Organisms/Dashboard/RecentOrder/RecentOrders";
import RecentProduct from "../../../components/Organisms/Dashboard/RecentProduct/RecentProducts";
import LineChart from "../../../components/Molecules/Dashboard/LineChart/LineChart";
import RecentUsers from "../../../components/Organisms/Dashboard/RecentUsers/RecentUsers";

import { useGetDashWidgetInfosQuery } from "../../../redux/services/dashboard/dashboardApi";
import { convertToKFormat } from "../../../utils/convertToKFormat";

const AdminDashboard = () => {
    const { data: dashWidgetInfosData, isLoading } = useGetDashWidgetInfosQuery(
        {}
    );
    const dashWidgetInfos = dashWidgetInfosData?.data;

    return (
        <>
            <div>
                {/* Dash Widget Card */}
                <section>
                    <div className="grid lg:grid-cols-4 gap-3 grid-cols-1 md:grid-cols-3">
                        <DashWidget
                            icon={<AiOutlineUserAdd />}
                            title={"Users"}
                            account={dashWidgetInfos?.users?.total}
                        />
                        <DashWidget
                            icon={<SlHandbag />}
                            title={"Orders"}
                            account={dashWidgetInfos?.orders?.total}
                        />
                        <DashWidget
                            icon={<MdOutlineProductionQuantityLimits />}
                            title={"Products"}
                            account={dashWidgetInfos?.products?.total}
                        />
                        <DashWidget
                            icon={<GiTakeMyMoney />}
                            title={"Total Earnings"}
                            account={convertToKFormat(
                                dashWidgetInfos?.orders?.totalEarnings
                            )}
                            isEarning
                        />
                    </div>
                </section>

                {/* Recent Order And Product Table */}
                <section className="mt-10">
                    <div className="md:grid block lg:grid-cols-12 grid-cols-1 gap-3">
                        <div className="col-span-8 lg:mb-0 mb-6">
                            <RecentOrder
                                orders={dashWidgetInfos?.orders?.orders || []}
                                isLoading={isLoading}
                            />
                        </div>
                        <div className="md:col-span-4 col-span-1">
                            <RecentProduct
                                products={
                                    dashWidgetInfos?.products?.products || []
                                }
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </section>

                {/* Recent Users And Line Chart */}
                <section className="mt-10 sm:mt-5">
                    <div className="grid lg:grid-cols-12 grid-cols-1 gap-3">
                        <div className="col-span-6">
                            <LineChart
                                data={{
                                    users: dashWidgetInfos?.users?.total,
                                    orders: dashWidgetInfos?.orders?.total,
                                    products: dashWidgetInfos?.products?.total,
                                }}
                            />
                        </div>
                        <div className="col-span-6  mt-6">
                            <RecentUsers
                                users={dashWidgetInfos?.users?.users || []}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AdminDashboard;
