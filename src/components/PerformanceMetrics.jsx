import React from 'react';

function PerformanceMetrics({ reportsData }) {
    const metrics = reportsData.performanceMetrics || {};
    const topPerformers = reportsData.topPerformers || [];

    return (
        <div className="card" data-name="performance-metrics" data-file="components/PerformanceMetrics.jsx">
            <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg">
                    <p className="text-sm text-[var(--text-secondary)]">Customer Satisfaction</p>
                    <p className="text-xl font-bold text-[var(--primary-color)]">{metrics.customerSatisfaction}/5.0</p>
                </div>

                <div className="text-center p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg">
                    <p className="text-sm text-[var(--text-secondary)]">Churn Rate</p>
                    <p className="text-xl font-bold text-[var(--primary-color)]">{metrics.churnRate}%</p>
                </div>
            </div>

            <div className="mb-4">
                <h4 className="font-semibold text-[var(--text-primary)] mb-3">Top Performers</h4>
                <div className="space-y-3">
                    {topPerformers.map((performer, index) => (
                        <div key={performer.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">{index + 1}</span>
                                </div>
                                <span className="font-medium text-[var(--text-primary)]">{performer.name}</span>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-[var(--text-primary)]">${performer.revenue.toLocaleString()}</p>
                                <p className="text-xs text-[var(--text-secondary)]">{performer.deals} deals</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PerformanceMetrics;
