import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
            display: false,
        },
        title: {
            display: true,
            text: "Project Summary",
            color: "#000",
            font: {
                size: 16,
            },
        },
    },
    scales: {
        x: {
            ticks: {
                color: "#000",
                font: {
                    size: 12,
                },
            },
        },
        y: {
            ticks: {
                color: "#000",
            },
        },
    },
};

const labels = ["Users", "Orders", "Products"];

type LineChartPropType = {
    data: {
        users: number;
        orders: number;
        products: number;
    };
};
const LineChart = ({ data }: LineChartPropType) => {
    return (
        <div style={{ width: "100%", backgroundColor:"#fff", padding:"10px" }}>
            <Line
                options={options}
                data={{
                    labels,
                    datasets: [
                        {
                            label: "",
                            data: [data.users, data.orders, data.products],
                            borderColor: "#9ca3af",
                            backgroundColor: "transparent",
                        },
                    ],
                }}
            />
        </div>
    );
};

export default LineChart;
