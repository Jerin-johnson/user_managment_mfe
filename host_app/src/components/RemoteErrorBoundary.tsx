import React, { ReactNode } from "react";

// 1. Define Props Type
interface RemoteErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // optional custom fallback UI
}

// 2. Define State Type
interface RemoteErrorBoundaryState {
  hasError: boolean;
}

// 3. Class Component
class RemoteErrorBoundary extends React.Component<
  RemoteErrorBoundaryProps,
  RemoteErrorBoundaryState
> {
  constructor(props: RemoteErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  // 4. Triggered when error happens
  static getDerivedStateFromError(): RemoteErrorBoundaryState {
    return { hasError: true };
  }

  // 5. Useful for logging
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Remote crashed:", error, errorInfo);
  }

  // 6. Render UI
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>⚠️ Failed to load this module</div>;
    }

    return this.props.children;
  }
}

export default RemoteErrorBoundary;
