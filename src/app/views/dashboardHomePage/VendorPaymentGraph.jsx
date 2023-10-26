import React from 'react'
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


const VendorPaymentGraph = ({ vendorPaymentGraph }) => {
    const data = {
        // x-axis label values
        labels: vendorPaymentGraph?.map((item) => item?.month ? item?.month : 0),
        datasets: [
            {
                label: " Vendor Payment ",
                // y-axis data plotting values
                data: vendorPaymentGraph?.map((item) => item?.paid_amount ? item?.paid_amount : 0),
                fill: false,
                // borderWidth: 3,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: 'green',
                responsive: true,
            },
        ],
    }

    return (
        <div  >
            <Line
                data={data}
            />
        </div>
    )
}

export default VendorPaymentGraph