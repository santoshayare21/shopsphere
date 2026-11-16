import { Component } from 'react'
import ErrorState from '@/components/ui/ErrorState'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <ErrorState
            title="This page failed to load"
            description="An unexpected error occurred. You can retry without leaving."
            onRetry={this.handleRetry}
          />
        </div>
      )
    }
    return this.props.children
  }
}
