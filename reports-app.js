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

function ReportsApp() {
  try {
    const [reportsData, setReportsData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      setTimeout(() => {
        setReportsData(mockReportsData);
        setLoading(false);
      }, 1000);
    }, []);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50" data-name="loading" data-file="reports-app.js">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">Loading Reports...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50" data-name="reports-app" data-file="reports-app.js">
        <Sidebar currentPage="reports" />
        <div className="main-content">
          <ReportsHeader />
          <main className="p-6">
            <ReportsOverview reportsData={reportsData} />
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ReportsApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <ReportsApp />
  </ErrorBoundary>
);