import React, { useState, useEffect, useCallback }  from 'react';
import LineChart from '../chart/lineChart';



function MarketHistroyChart(props) {
        
    if(props.checkedCategory && Array.isArray(props.checkedCategory)) {
        const labels = getChartLabels(14);
        let data = {
            labels: labels,
            datasets: []
        }

        if(props.checkedCategory.length > 0) {
            props.checkedCategory.forEach((category, categoryIdx) => {
                const priceRecord = props.priceHistory[category].map((price) => {
                    return price.AvgPrice;
                });

                data.datasets.push(
                    {
                        label: props.checkedCategory[categoryIdx],
                        data: priceRecord,
                        backgroundColor: colorTable[categoryIdx]
                    }
                );
            });


        } else {
            data.datasets.push(
                { label: "아이템을 선택해 주세요", data: [], backgroundColor: colorTable[0] }
            );
        }

        return ( 
            <LineChart 
                options={marketHistroyChartOptions}
                data={data}
            />
        );
    }
    

    return <LineChart />
}

const colorTable = [
    '#800000', '#98FB98', '#FA8072', '#E9967A', '#FFA500',
    '#6A5ACD' , '#BA55D3', '#FFFF00', '#228B22', 'B0C4DE' 
];

const marketHistroyChartOptions = {
    responsive: true,
    aspectRatio: 1,
    resizeDelay: 500,
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: '거래소 시세'
        },
        colors: {
            enabled: true
        },
    }
};

const getChartLabels = (day) => {
    const days = Array(day).fill().map((v,i)=>day-i);
    let now = new Date();
    const labels = days.map((day) => {
        const tmpDate = new Date( now.getTime() - ( day * 24 * 60 * 60 * 1000 ));
        return (tmpDate.getFullYear() + '-' + (tmpDate.getMonth()+1) + '-' + tmpDate.getDate());
    });
    console.log();
    return labels;
};

export default MarketHistroyChart;