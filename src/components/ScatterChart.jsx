import { } from 'chart.js';


import {
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);



const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
        x: {
            beginAtZero: true,
        },
    },
};


export const ScatterChart = ({ points, centroids }) => {
    const data = {
        datasets: [
            {
                label: 'Points',
                data: points,
                backgroundColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 3
            },
            {
                label: 'Centroids',
                data: centroids,
                backgroundColor: 'rgb(178,199,128)',
                pointRadius: 5
            },
            {
                label: 'Centroids Area',
                data: centroids,
                backgroundColor: 'rgba(163,119,200,0.3)',
                pointRadius: 30
            }
        ],
    }

    return (
        <Scatter
            className='graph'
            options={options}
            data={data}
        />
    );
}

