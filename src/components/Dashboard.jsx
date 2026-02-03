import React from 'react';
import StatCard from './StatCard';
import SalesChart from './SalesChart';

function Dashboard({ customers }) {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const totalValue = customers.reduce((sum, c) => sum + c.value, 0);
    const avgValue = totalCustomers > 0 ? Math.round(totalValue / totalCustomers) : 0;

    const recentCustomers = customers.slice(0, 3);

    return (
        <div className="space-y-6" data-name="dashboard" data-file="components/Dashboard.jsx">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    title="Valor Total"
                    value={`$${totalValue.toLocaleString()}`}
                    icon="dollar-sign"
                    color="yellow"
                    trend={15}
                />
                <StatCard
                    title="Valor Promedio"
                    value={`$${avgValue.toLocaleString()}`}
                    icon="trending-up"
                    color="purple"
                    trend={5}
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
                                    <span className={`status-badge status-${customer.status}`}>
                                        {customer.status === 'active' ? 'Activo' : customer.status === 'pending' ? 'Pendiente' : 'Inactivo'}
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
