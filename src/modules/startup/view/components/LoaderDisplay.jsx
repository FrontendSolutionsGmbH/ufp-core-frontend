import React, {Component} from 'react'
import PropTypes from 'prop-types'
import HOCLoader from '../HOCLoader'
import DefaultLoaderView from './DefaultLoaderView'

export class LoaderDisplay extends Component {

    static propTypes = {
        appComponent: PropTypes.any.isRequired,
        appInitialized: PropTypes.bool.isRequired,
        loaderComponent: PropTypes.any.isRequired,
        stagePercentage: PropTypes.number.isRequired,
        stepPercentage: PropTypes.number.isRequired,
        totalPercentage: PropTypes.number.isRequired
    }

    static defaultProps = {

        loaderComponent: DefaultLoaderView

    }

    render() {
        if (this.props.appInitialized) {
            return (this.props.appComponent
            )
        } else {
            const Component = this.props.loaderComponent
            return (<Component {...this.props} />
            )
        }
    }

}

export default HOCLoader(LoaderDisplay)
