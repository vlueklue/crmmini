import React from 'react';
import Chart from 'chart.js/auto';
import { mockSalesData } from '../utils/mockData';

function SalesChart() {
    const chartRef = React.useRef(null);
    const chartInstance = React.useRef(null);

    React.useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            // Destroy existing chart if it exists
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: mockSalesData.map(item => item.month),
                    datasets: [{
                        label: 'Sales',
                        data: mockSalesData.map(item => item.sales),
                        borderColor: 'rgb(124, 58, 237)',
                        backgroundColor: 'rgba(124, 58, 237, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div style={{ height: '300px' }} data-name="sales-chart" data-file="components/SalesChart.jsx">
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default SalesChart;
