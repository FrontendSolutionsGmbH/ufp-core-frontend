import ConfigSelectors from '../model/ConfigSelectors'
import ConfigActionCreators from '../controller/ConfigActionCreators'
import {connect} from 'react-redux'

const mapStateToProps = (state, props) => ({
    getConfigValue: ConfigSelectors.getConfigValue(state, props)

})

const mapDispatchToProps = {

    setConfigValue: ConfigActionCreators.setConfigValue

}

export default () => connect(mapStateToProps, mapDispatchToProps)
