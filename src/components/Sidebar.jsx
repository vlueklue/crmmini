import React from 'react';
import { LayoutDashboard, TrendingUp, Users, ChartBar, User } from 'lucide-react';

const iconMap = {
    'layout-dashboard': LayoutDashboard,
    'trending-up': TrendingUp,
    'users': Users,
    'chart-bar': ChartBar,
};

function Sidebar({ currentPage = 'dashboard', onNavigate }) {
    const menuItems = [
        { id: 'dashboard', label: 'Panel Principal', icon: 'layout-dashboard' },
        { id: 'sales', label: 'Ventas', icon: 'trending-up' },
        { id: 'customers', label: 'Clientes', icon: 'users' },
        { id: 'reports', label: 'Reportes', icon: 'chart-bar' }
    ];

    return (
        <div className="sidebar" data-name="sidebar" data-file="components/Sidebar.jsx">
            <div className="p-6 border-b border-[var(--border-color)]">
                <h1 className="text-xl font-bold text-gradient">Mini CRM</h1>
            </div>

            <nav className="p-4">
                <ul className="space-y-2">
                    {menuItems.map(item => {
                        const IconComponent = iconMap[item.icon] || Users;
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => onNavigate(item.id)}
                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${currentPage === item.id
                                        ? 'bg-[var(--primary-color)] text-white'
                                        : 'text-[var(--text-secondary)] hover:bg-gray-100'
                                        }`}
                                >
                                    <IconComponent className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="absolute bottom-6 left-4 right-4">
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                            <User className="text-white w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-[var(--text-primary)]">Administrador</p>
                            <p className="text-xs text-[var(--text-secondary)]">admin@company.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
