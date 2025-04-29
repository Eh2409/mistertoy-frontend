import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export function DoughnutChart({ labelData }) {
    const data = {
        labels: labelData.map(lable => lable.name),
        datasets: [
            {
                label: 'Percentage of toys',
                data: labelData.map(lable => lable.percentage),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(83, 255, 64,0.2)',
                    'rgba(177, 159, 24,0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgb(39, 177, 24)',
                    'rgb(177, 159, 24)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return <Doughnut data={data} />;

}
