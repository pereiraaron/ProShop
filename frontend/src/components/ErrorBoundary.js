import React from "react";
import Message from "./Message";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Message variant="danger">Something went wrong.</Message>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
