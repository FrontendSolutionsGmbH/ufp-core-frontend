import UFPRequestActions from './UfpRequestActions'
import UfpTypes from 'ufp-types'
import UfpMiddlewareUtils from './UfpMiddlewareUtils'
import UfpMiddlewareConstants from './UfpMiddlewareConstants'

const UFPResultTypes = UfpTypes.shape({
    END: UfpTypes.oneOfType([
        UfpTypes.string,
        UfpTypes.arrayOf(UfpTypes.string)
    ]).isRequired,
    FAILURE: UfpTypes.oneOfType([
        UfpTypes.string,
        UfpTypes.arrayOf(UfpTypes.string)
    ]).isRequired,
    REQUEST: UfpTypes.oneOfType([
        UfpTypes.string,
        UfpTypes.arrayOf(UfpTypes.string)
    ]).isRequired,
    SUCCESS: UfpTypes.oneOfType([
        UfpTypes.string,
        UfpTypes.arrayOf(UfpTypes.string)
    ]).isRequired
}).isRequired
const UFPActionPropTypes = {
    [UFPRequestActions.UFP_REQUEST_ACTION]: UfpTypes.shape({
        ufpDefinition: UfpTypes.shape({
            url: UfpTypes.string.isRequired,
            method: UfpTypes.oneOf([
                UfpMiddlewareConstants.RequestMethodConstants.GET,
                UfpMiddlewareConstants.RequestMethodConstants.POST,
                UfpMiddlewareConstants.RequestMethodConstants.DELETE,
                UfpMiddlewareConstants.RequestMethodConstants.PATCH,
                UfpMiddlewareConstants.RequestMethodConstants.PUT]).isRequired,
            requestType: UfpTypes.string,
            actionConstants: UfpTypes.object
        }).isRequired,
        ufpData: UfpTypes.shape({
            urlParams: UfpTypes.object,
            queryParams: UfpTypes.object,
            body: UfpTypes.any
        }).isRequired,
        ufpTypes: UfpTypes.object,
        ufpPayload: UfpTypes.object,
        // ufpActionCreators: UfpTypes.object,
        ufpResultHandler: UfpTypes.arrayOf(UfpTypes.shape({
            matcher: UfpTypes.func.isRequired,
            handler: UfpTypes.func.isRequired
        })).isRequired,
        ufpPreHandler: UfpTypes.arrayOf(UfpTypes.shape({
            matcher: UfpTypes.func.isRequired,
            handler: UfpTypes.func.isRequired
        })).isRequired
    })
}
const UFPTypesPropTypes = {
    [UFPRequestActions.UFP_REQUEST_ACTION]: UfpTypes.oneOfType([UfpTypes.shape({
        ufpTypes: UFPResultTypes
    }), UfpTypes.shape({
        ufpDefinition: UfpTypes.shape(
            {
                actionConstants: UFPResultTypes
            })
    })])
}

export const isUFPAction = (action) => {
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
export const validateUFPAction = (action) => {
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
    try {
        UfpMiddlewareUtils.ReactPropTypesCheck(action, UFPTypesPropTypes, true)
    }
    catch (e) {
        //console.error('Validation returned check ', e.message)
        var err = new Error('Failed prop type: The prop `UFPREQUESTACTION.ufpTypes` or ' +
            '`UFPREQUESTACTION.ufpDefinition.actionConstants` need to be defined')
        return [err]
    }
    return []
}

export default {
    isUFPAction,
    validateUFPAction
}
