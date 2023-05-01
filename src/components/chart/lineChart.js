import React, { useState, useEffect, useCallback }  from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const defaultOption = {
    responsive: true,
    aspectRatio: 1,
    resizeDelay: 500,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Default Title'
        },
    }
};

const createDefaultLabel = (day) => {
    const days = Array(day).fill().map((v,i)=>i+1);
    let now = new Date();
    const labels = days.map((day) => {
        const tmpDate = new Date( now.getTime() - ( day * 24 * 60 * 60 * 1000 ));
        return (tmpDate.getFullYear() + '-' + (tmpDate.getMonth()+1) + '-' + tmpDate.getDate());
    });

    return labels;
};

const createDefaultChartData = () => {
    const labels = createDefaultLabel(14);
    let data = {
        labels: labels,
        datasets: []
    }

    return data;
}

function LineChart(props) {
    return (
        <Line 
            options={(props.options ? props.options : defaultOption)} 
            data={(props.data ? props.data : createDefaultChartData())} 
        />
    );
}

export default LineChart;