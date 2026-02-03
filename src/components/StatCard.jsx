import React from 'react';
import { UserCheck, Users, DollarSign, TrendingUp } from 'lucide-react';

const iconMap = {
    'user-check': UserCheck,
    'users': Users,
    'dollar-sign': DollarSign,
    'trending-up': TrendingUp,
};

function StatCard({ title, value, icon, color, trend }) {
    const IconComponent = iconMap[icon] || Users;

    const colorClasses = {
        blue: 'bg-gradient-to-br from-violet-500 to-purple-600',
        green: 'bg-gradient-to-br from-emerald-500 to-teal-600',
        yellow: 'bg-gradient-to-br from-amber-500 to-orange-600',
        purple: 'bg-gradient-to-br from-purple-600 to-indigo-700'
    };

    return (
        <div className="card" data-name="stat-card" data-file="components/StatCard.js">
            <div className="flex items-center justify-between">
                <div>
                    <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center shadow-lg`}>
                        <IconComponent className="text-white w-6 h-6" />
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm font-medium">{title}</p>
                    {trend && (
                        <div className="flex items-center mt-2 text-sm">
                            <TrendingUp className={`w-3 h-3 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`} />
                            <span className={`ml-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {Math.abs(trend)}% desde el mes pasado
                            </span>
                        </div>
                    )}
                </div>
                <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{value}</p>
            </div>
        </div>
    );
}

export default StatCard;
