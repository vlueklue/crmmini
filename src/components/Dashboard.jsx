import React from 'react';
import StatCard from './StatCard';
import SalesChart from './SalesChart';

function Dashboard({ customers, prospects = [], salesOpportunities = [] }) {
    const [timeRange, setTimeRange] = React.useState('year');

    const filterByTime = (dateString) => {
        if (!dateString) return false;
        const date = new Date(dateString);
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfYear = new Date(now.getFullYear(), 0, 1);

        switch (timeRange) {
            case 'week':
                return date >= startOfWeek;
            case 'month':
                return date >= startOfMonth;
            case 'year':
                return date >= startOfYear;
            default:
                return true;
        }
    };

    // Filtered Data
    const filteredCustomers = customers.filter(c => filterByTime(c.lastContact));
    const filteredProspects = prospects.filter(p => filterByTime(p.lastContact));
    const filteredOpportunities = salesOpportunities.filter(o => filterByTime(o.closeDate));

    // Counts
    const totalCustomers = filteredCustomers.length;
    const activeCustomers = filteredCustomers.filter(c => c.status === 'Activo').length;
    const inNegotiationAll = filteredOpportunities.filter(o => o.status === 'in-progress');
    const inNegotiationCount = inNegotiationAll.length;

    // Values
    const totalValue = filteredCustomers.reduce((sum, c) => sum + c.value, 0);
    const prospectsValue = filteredProspects.reduce((sum, p) => sum + (p.value || 0), 0);
    const negotiationValue = inNegotiationAll.reduce((sum, o) => sum + o.value, 0);
    const activeValue = filteredCustomers.filter(c => c.status === 'Activo').reduce((sum, c) => sum + c.value, 0);


    const recentCustomers = customers.slice(0, 3);

    return (
        <div className="space-y-6" data-name="dashboard" data-file="components/Dashboard.jsx">
            {/* Stats Grid */}
            {/* Stats Grid */}
            {/* Header & Filter */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Resumen de Actividad</h2>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="input-field w-auto px-4 py-2"
                >
                    <option value="week">Esta Semana</option>
                    <option value="month">Este Mes</option>
                    <option value="year">Este Año</option>
                </select>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Prospectos"
                    value={filteredProspects.length}
                    icon="user-plus"
                    color="blue"
                    trend={10}
                />
                <StatCard
                    title="En Negociación"
                    value={inNegotiationCount}
                    icon="briefcase"
                    color="purple"
                    trend={5}
                />
                <StatCard
                    title="Clientes Activos"
                    value={activeCustomers}
                    icon="user-check"
                    color="green"
                    trend={8}
                />
                <StatCard
                    title="Total Clientes"
                    value={totalCustomers}
                    icon="users"
                    color="blue"
                    trend={12}
                />

                <StatCard
                    title="Valor de Prospectos"
                    value={`$${prospectsValue.toLocaleString()}`}
                    icon="dollar-sign"
                    color="blue"
                />
                <StatCard
                    title="Valor en Negociación"
                    value={`$${negotiationValue.toLocaleString()}`}
                    icon="trending-up"
                    color="purple"
                />
                <StatCard
                    title="Valor Clientes Activos"
                    value={`$${activeValue.toLocaleString()}`}
                    icon="activity"
                    color="green"
                />
                <StatCard
                    title="Valor Total"
                    value={`$${totalValue.toLocaleString()}`}
                    icon="dollar-sign"
                    color="yellow"
                    trend={15}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Chart */}
                <div className="card">
                    <h3 className="text-lg font-semibold mb-4">Resumen de Ventas</h3>
                    <SalesChart />
                </div>

                {/* Recent Customers */}
                <div className="card">
                    <h3 className="text-lg font-semibold mb-4">Clientes Recientes</h3>
                    <div className="space-y-3">
                        {recentCustomers.map(customer => (
                            <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                                        <span className="text-white font-medium text-sm">
                                            {customer.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--text-primary)]">{customer.name}</p>
                                        <p className="text-sm text-[var(--text-secondary)]">{customer.company}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">${customer.value.toLocaleString()}</p>
                                    <span className={`status-badge ${customer.status === 'Activo' ? 'status-active' :
                                        customer.status === 'Inactivo' ? 'status-inactive' :
                                            'status-pending'
                                        }`}>
                                        {customer.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
