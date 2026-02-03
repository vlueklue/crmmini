import React from 'react';
import { Target, DollarSign, Trophy, TrendingUp } from 'lucide-react';
import SalesPipeline from './SalesPipeline';
import RevenueChart from './RevenueChart';

function SalesOverview({ salesData }) {
    const totalOpportunities = salesData.length;
    const totalValue = salesData.reduce((sum, opp) => sum + opp.value, 0);
    const wonDeals = salesData.filter(opp => opp.status === 'won').length;
    const avgDealSize = totalOpportunities > 0 ? Math.round(totalValue / totalOpportunities) : 0;

    return (
        <div className="space-y-6" data-name="sales-overview" data-file="components/SalesOverview.jsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[var(--text-secondary)]">Oportunidades Totales</p>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">{totalOpportunities}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                            <Target className="text-xl text-white w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[var(--text-secondary)]">Valor del Pipeline</p>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">${totalValue.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                            <DollarSign className="text-xl text-white w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[var(--text-secondary)]">Tratos Ganados</p>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">{wonDeals}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                            <Trophy className="text-xl text-white w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[var(--text-secondary)]">Tamaño Promedio</p>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">${avgDealSize.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                            <TrendingUp className="text-xl text-white w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesPipeline salesData={salesData} />
                <RevenueChart />
            </div>
        </div>
    );
}

export default SalesOverview;
