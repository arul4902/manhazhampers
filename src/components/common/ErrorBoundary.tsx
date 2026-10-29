import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Sparkles, RefreshCcw } from 'lucide-react';
import { GoldDivider } from './GoldDivider';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ivory-50 text-espresso-900 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-700 flex items-center justify-center mb-4">
            <Sparkles className="w-7 h-7 text-gold-600" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-900">
            Something went momentarily wrong
          </h1>
          <GoldDivider />
          <p className="text-xs sm:text-sm text-espresso-700/80 max-w-md mx-auto mb-6 font-light leading-relaxed">
            We apologize for the brief inconvenience. Please refresh or return to our homepage to continue exploring our handcrafted collections.
          </p>

          <button
            type="button"
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-burgundy-600 hover:bg-burgundy-700 text-ivory-50 text-xs sm:text-sm font-semibold transition shadow-sm"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
