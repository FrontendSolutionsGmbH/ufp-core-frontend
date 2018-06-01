import UFPRequestActions from './UfpRequestActions'
import UfpTypes from 'ufp-types'
import UfpMiddlewareUtils from './UfpMiddlewareUtils'
import {isObject} from 'lodash-es'
import UfpMiddlewareConstants from './UfpMiddlewareConstants'

const UFPResultTypes = UfpTypes.shape({
    END: UfpTypes.oneOfType([
        UfpTypes.string.isRequired,
        UfpTypes.arrayOf(UfpTypes.string).isRequired
    ]),
    FAILURE: UfpTypes.oneOfType([
        UfpTypes.string.isRequired,
        UfpTypes.arrayOf(UfpTypes.string).isRequired
    ]),
    REQUEST: UfpTypes.oneOfType([
        UfpTypes.string.isRequired,
        UfpTypes.arrayOf(UfpTypes.string).isRequired
    ]),
    SUCCESS: UfpTypes.oneOfType([
        UfpTypes.string.isRequired,
        UfpTypes.arrayOf(UfpTypes.string).isRequired
    ])
})
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
            actionConstants: UFPResultTypes
        }).isRequired,
        ufpData: UfpTypes.shape({
            urlParams: UfpTypes.object,
            queryParams: UfpTypes.object,
            body: UfpTypes.any
        }),
        ufpPayload: UfpTypes.object,
        ufpActionCreators: UfpTypes.object,
        ufpResultHandler: UfpTypes.arrayOf(UfpTypes.shape({
            matcher: UfpTypes.func.isRequired,
            handler: UfpTypes.func.isRequired
        })),
        ufpPreHandler: UfpTypes.arrayOf(UfpTypes.shape({
            matcher: UfpTypes.func.isRequired,
            handler: UfpTypes.func.isRequired
        }))
    })
}

export const isUFPAction = (action) => {
    return isObject(action) && action.hasOwnProperty(UFPRequestActions.UFP_REQUEST_ACTION)
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
    return UfpMiddlewareUtils.ReactPropTypesCheck(action, UFPActionPropTypes, false)
}

export default {
    isUFPAction,
    validateUFPAction
}
