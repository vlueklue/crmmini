import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CustomerList from './components/CustomerList';
import ProspectList from './components/ProspectList';
import SalesOverview from './components/SalesOverview';
import ReportsOverview from './components/ReportsOverview';
import { mockCustomers, mockProspects } from './utils/mockData';
import { mockSalesData } from './utils/salesData';
import { mockReportsData } from './utils/reportsData';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [currentView, setCurrentView] = React.useState('dashboard');
    const [customers, setCustomers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      // Simulate loading data
      setTimeout(() => {
        setCustomers(mockCustomers);
        setLoading(false);
      }, 1000);
    }, []);

    const renderContent = () => {
      switch (currentView) {
        case 'dashboard':
          return <Dashboard customers={customers} />;
        case 'customers':
          return <CustomerList customers={customers} setCustomers={setCustomers} />;
        case 'prospects':
          return <ProspectList prospects={mockProspects} />;
        case 'sales':
          return <SalesOverview salesData={mockSalesData} />;
        case 'reports':
          return <ReportsOverview reportsData={mockReportsData} />;
        default:
          return <Dashboard customers={customers} />;
      }
    };

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50" data-name="loading" data-file="app.jsx">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">Loading CRM Dashboard...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50" data-name="app" data-file="app.jsx">
        <Sidebar currentPage={currentView} onNavigate={setCurrentView} />
        <div className="main-content">
          <Header />
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

export default function AppWithBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  )
}