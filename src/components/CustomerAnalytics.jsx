import React from 'react';
import Chart from 'chart.js/auto';

function CustomerAnalytics({ reportsData }) {
    const chartRef = React.useRef(null);
    const chartInstance = React.useRef(null);

    React.useEffect(() => {
        if (chartRef.current && reportsData.customerGrowth) {
            const ctx = chartRef.current.getContext('2d');

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: reportsData.customerGrowth.map(item => item.month),
                    datasets: [{
                        label: 'Total Customers',
                        data: reportsData.customerGrowth.map(item => item.customers),
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
                            beginAtZero: false
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
    }, [reportsData]);

    return (
        <div className="card" data-name="customer-analytics" data-file="components/CustomerAnalytics.jsx">
            <h3 className="text-lg font-semibold mb-4">Customer Growth</h3>
            <div style={{ height: '300px' }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default CustomerAnalytics;
