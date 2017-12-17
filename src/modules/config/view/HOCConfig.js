import ConfigSelectors from '../model/ConfigSelectors'
import ConfigActionCreators from '../controller/ConfigActionCreators'
import {connect} from 'react-redux'
const mapStateToProps = (state) => ({
    getConfigValue: ConfigSelectors.getConfigValue

})

const mapDispatchToProps = {

    setConfigValue: ConfigActionCreators.setConfigValue

}

export default () => connect(mapStateToProps, mapDispatchToProps)
