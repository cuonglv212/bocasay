import React from "react";
import { connect } from "react-redux";
import { logError } from "../actions/characterActions";

interface ErrorBoundaryState {
    hasError: boolean
 }

 interface ErrorBoundaryProps {
    onError: React.ReactNode,
    children: React.ReactNode,
    dispatch: any
 }

class ErrorBoundary1 extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
        this.props.dispatch(logError(error.message))
    }
  
    render() {
      if (this.state.hasError) {
        return this.props.onError; 
      }
  
      return this.props.children; 
    }
  }

  export default connect()(ErrorBoundary1);
  