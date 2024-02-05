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


const LineChart = () => {
    const data = {
        // x-axis label values
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: "Students",
                // y-axis data plotting values
                data: [12, 19, 3, 5, 2, 3, 10, 15, 20, 25, 30, 35],
                // backgroundColor: "blue",
                borderColor: '#3b5998',
                responsive: true,
                fill: true

            },
            {
                label: "Teachers",
                data: [10, 15, 20, 25, 30, 35, 12, 19, 3, 5, 2, 3],
                // backgroundColor: "red",
                borderColor: '#1877F2',
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


export default LineChart