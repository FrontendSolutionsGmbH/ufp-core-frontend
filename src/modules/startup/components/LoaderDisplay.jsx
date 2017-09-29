import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import StartupSelectors from '../StartupSelectors'
import DefaultLoaderView from './DefaultLoaderView'

export class LoaderDisplay extends Component {

    static propTypes = {
        loaderComponent: PropTypes.any.isRequired,
        appComponent: PropTypes.any.isRequired,
        totalPercentage: PropTypes.number.isRequired,
        stagePercentage: PropTypes.number.isRequired,
        stepPercentage: PropTypes.number.isRequired,
        appInitialized: PropTypes.bool.isRequired,
        defaultMessage: PropTypes.string,
        values: PropTypes.object
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

const mapStateToProps = (state) => ({
    appInitialized: StartupSelectors.AppInitialisedSelector(state),
    totalPercentage: StartupSelectors.TotalPercentageSelector(state),
    stagePercentage: StartupSelectors.StagePercentageSelector(state),
    stepPercentage: StartupSelectors.StepPercentageSelector(state)
})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(LoaderDisplay)