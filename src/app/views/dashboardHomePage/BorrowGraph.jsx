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


const BorrowGraph = ({ itemRentGraph }) => {
    const data = {
        // x-axis label values
        labels: itemRentGraph?.map((item) => item?.day ? item?.day : 0),
        datasets: [
            {
                label: "Borrow Book ",
                // y-axis data plotting values
                data: itemRentGraph?.map((item) => item?.rental_book ? item?.rental_book : 0),
                backgroundColor: "purple",
                borderColor: 'orange',
                responsive: true,
                fill: true
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

export default BorrowGraph

export const MyOne = () => {
    return (
        <>
            this im
        </>
    )
}
