import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        name: PropTypes.string

    }

    static defaultProps = {
        name: undefined

    }

    constructor(props) {
        super(props)
        this.state = {hasError: false}
    }

    componentDidCatch(error, errorInfo) {
        // Display fallback UI
        this.setState({
            hasError: true,
            error,
            errorInfo
        })
        // console.log('error boundary error1 ', error, errorInfo)
        // console.log('error boundary error2 ', this.state, this.props)

        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info)
    }

    render() {
       // console.log('error boundary rendering ', this.props)
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (<div >
                <h3>UFP Successfully detected a misbehaviour</h3>
                <h4>{this.props.name}{this.state.error.toString()}</h4>
                <pre >
                    {this.state.errorInfo.componentStack}
                </pre>
            </div>)
        }
        return this.props.children
    }

}

export default ErrorBoundary
