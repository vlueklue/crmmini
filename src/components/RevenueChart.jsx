import React from 'react';
import Chart from 'chart.js/auto';
import { mockRevenueData } from '../utils/salesData';

function RevenueChart() {
    const chartRef = React.useRef(null);
    const chartInstance = React.useRef(null);

    React.useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: mockRevenueData.map(item => item.month),
                    datasets: [{
                        label: 'Revenue',
                        data: mockRevenueData.map(item => item.revenue),
                        backgroundColor: 'rgba(124, 58, 237, 0.8)',
                        borderColor: 'rgb(124, 58, 237)',
                        borderWidth: 1
                    }, {
                        label: 'Target',
                        data: mockRevenueData.map(item => item.target),
                        backgroundColor: 'rgba(245, 158, 11, 0.3)',
                        borderColor: 'rgb(245, 158, 11)',
                        borderWidth: 2,
                        type: 'line'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return '$' + (value / 1000) + 'K';
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
        <div className="card" data-name="revenue-chart" data-file="components/RevenueChart.jsx">
            <h3 className="text-lg font-semibold mb-4">Revenue vs Target</h3>
            <div style={{ height: '300px' }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default RevenueChart;
