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
              className="btn-primary"
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

function SalesApp() {
  try {
    const [salesData, setSalesData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      setTimeout(() => {
        setSalesData(mockSalesOpportunities);
        setLoading(false);
      }, 1000);
    }, []);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50" data-name="loading" data-file="sales-app.js">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">Loading Sales Data...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50" data-name="sales-app" data-file="sales-app.js">
        <Sidebar currentPage="sales" />
        <div className="main-content">
          <SalesHeader />
          <main className="p-6">
            <SalesOverview salesData={salesData} />
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error('SalesApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <SalesApp />
  </ErrorBoundary>
);