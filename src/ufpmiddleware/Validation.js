import UFPRequestActions from './UfpRequestActions'
import PropTypes from 'prop-types'
import UfpMiddlewareUtils from './UfpMiddlewareUtils'

const UFPActionPropTypes = {
    [UFPRequestActions.UFP_REQUEST_ACTION]: PropTypes.shape({
        ufpDefinition: PropTypes.shape({
            url: PropTypes.string.isRequired,
            method: PropTypes.oneOf(['get', 'post', 'delete','put', 'patch']).isRequired,
            requestType: PropTypes.string,
            actionConstants: PropTypes.object
        }).isRequired,
        ufpData: PropTypes.shape({
            urlParams: PropTypes.object,
            queryParams: PropTypes.object,
            body: PropTypes.any
        }).isRequired,
        ufpTypes: PropTypes.object,
        ufpPayload: PropTypes.object,
       // ufpActionCreators: PropTypes.object,
        ufpResultHandler: PropTypes.arrayOf(PropTypes.shape({
            matcher: PropTypes.func.isRequired,
            handler: PropTypes.func.isRequired
        })).isRequired,
        ufpPreHandler: PropTypes.arrayOf(PropTypes.shape({
            matcher: PropTypes.func.isRequired,
            handler: PropTypes.func.isRequired
        })).isRequired
    })
}

const isUFPAction = (action) => {
    return typeof action === 'object' && action.hasOwnProperty(UFPRequestActions.UFP_REQUEST_ACTION)
}

/**
 * Checks an action against the RSAA definition, returning a (possibly empty)
 * array of validation errors.
 *
 * @function validateRSAA
 * @access public
 * @param {object} action - The action to check against the RSAA definition
 * @returns {array}
 */
const validateUFPAction = (action) => {
    try {
        UfpMiddlewareUtils.ReactPropTypesCheck(action, UFPActionPropTypes, true)
    }
    catch (e) {
        //  console.error('Validation returned check ', action)
        //  console.error('Validation returned check ', action[UfpRequestActions.UFP_REQUEST_ACTION])
        //  console.error('Validation returned check ', action[UfpRequestActions.UFP_REQUEST_ACTION]['ufpTypes'])
        // console.error('Validation returned ', e)
        //  console.error('--->' + e + '<--')
        return [e]
    }
    return []
}


export {isUFPAction, validateUFPAction}
