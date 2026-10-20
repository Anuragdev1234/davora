import { Component, type ErrorInfo, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('RootErrorBoundary caught an error:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '40px',
            fontFamily: 'monospace',
            backgroundColor: '#FFF5F5',
            color: '#991B1B',
            minHeight: '100vh',
          }}
        >
          <h1 style={{ fontSize: '20px', marginBottom: '16px' }}>
            Application Error Caught by Root Boundary:
          </h1>
          <p style={{ fontWeight: 'bold' }}>{this.state.error?.message}</p>
          <pre
            style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #FECACA',
              borderRadius: '8px',
              overflowX: 'auto',
              fontSize: '12px',
              lineHeight: 1.5,
            }}
          >
            {this.state.error?.stack}
          </pre>
          <button
            type="button"
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#191B19',
              color: '#FFFFFF',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
);
