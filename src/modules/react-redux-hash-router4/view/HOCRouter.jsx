import RouterSelectors from '../RouterSelectors'
import GetSearchObject from '../util/GetSearchObject'
import {connect} from 'react-redux'
import {push, goForward, goBack} from 'connected-react-router'

/**
 * the routerselector simply provides the location propery in any wrapped component
 * it uses the selector so its in our/react routers control to map that correctly
 *
 * purpose:
 *
 * the main purpose for this component is to allow overriding of react-router rendering
 * problems, simply put that where you need location aware re-rendering and it gets
 * updated when location changes due to property change
 *
 * @param state
 */

const mapStateToProps = (state) => ({
    location: RouterSelectors.getLocation(state),
    query: GetSearchObject(RouterSelectors.getLocation(state).search)
})

const mapDispatchToProps = {
    push,
    goForward,
    goBack

}

export default () => connect(mapStateToProps, mapDispatchToProps)
