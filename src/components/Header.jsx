import React from 'react';
import { Bell, Settings } from 'lucide-react';

function Header() {
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="bg-white border-b border-[var(--border-color)] px-6 py-4" data-name="header" data-file="components/Header.jsx">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)]">Panel CRM</h2>
                    <p className="text-[var(--text-secondary)]">Gestiona tus clientes y ventas</p>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                            {currentTime.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">
                            {currentTime.toLocaleTimeString()}
                        </p>
                    </div>

                    <button className="btn-secondary">
                        <Bell className="w-5 h-5" />
                    </button>

                    <button className="btn-secondary">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
