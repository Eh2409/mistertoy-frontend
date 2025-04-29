import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export function BarChart({ labelData }) {


    const data = {
        labels: labelData.map((item) => item.name),
        datasets: [
            {
                label: 'Percentage',
                data: labelData.map((item) => item.percentage),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Items',
                data: labelData.map((item) => item.items),
                backgroundColor: 'rgba(59, 40, 233, 0.6)',
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;


}
