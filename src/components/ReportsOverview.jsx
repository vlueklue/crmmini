import React from 'react';
import { Percent, DollarSign, Clock } from 'lucide-react';
import CustomerAnalytics from './CustomerAnalytics';
import PerformanceMetrics from './PerformanceMetrics';

function ReportsOverview({ reportsData }) {
    const metrics = reportsData.performanceMetrics || {};

    return (
        <div className="space-y-6" data-name="reports-overview" data-file="components/ReportsOverview.jsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card metric-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[var(--text-secondary)]">Tasa de Conversión</p>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">{metrics.conversionRate}%</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <Percent className="text-xl text-white w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="card metric-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[var(--text-secondary)]">Factura Promedio</p>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">${metrics.avgDealSize?.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                            <DollarSign className="text-xl text-white w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="card metric-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[var(--text-secondary)]">Ciclo de Ventas Promedio</p>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">{metrics.salesCycle}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                            <Clock className="text-xl text-white w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CustomerAnalytics reportsData={reportsData} />
                <PerformanceMetrics reportsData={reportsData} />
            </div>
        </div>
    );
}

export default ReportsOverview;
