
import {connect} from 'react-redux'
const mapStateToProps = (state) => ({
    appInitialized: StartupSelectors.AppInitialisedSelector(state),
    totalPercentage: StartupSelectors.TotalPercentageSelector(state),
    stagePercentage: StartupSelectors.StagePercentageSelector(state),
    stepPercentage: StartupSelectors.StepPercentageSelector(state)

})

const mapDispatchToProps = {}



export default connect(mapStateToProps, mapDispatchToProps)
