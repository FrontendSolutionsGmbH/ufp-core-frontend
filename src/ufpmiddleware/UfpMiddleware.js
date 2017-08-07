import UFPRequestActions from './UfpRequestActions'
import {isUFPAction, validateUFPAction} from './Validation'
import {InvalidUFPAction} from './Errors'
import UFPMiddlewareUtils from './UfpMiddlewareUtils'
import UFPMiddlewareConstants from './UfpMiddlewareConstants'

import UFPMiddlewareConfiguration from './UfpMiddlewareConfiguration'
//import UFPHandler from './UfpHandler'

function createUfpMiddleware (options={}) {

 return ({getState, dispatch}) => {
    return (next) => async(action) => {
        if (!isUFPAction(action)) {
            return next(action)
        }
        //  console.log('UFP Middleware ', UFPMiddlewareConfiguration, action)

        const dispatchPromise = new Promise(async(resolve /*, reject */) => {
            // Do not process actions without a [UFP_ACTION] property
            // Try to dispatch an error request FSA for invalid UFPAction's
            const validationErrors = validateUFPAction(action)
            // Parse the validated UFP_REQUEST_ACTION action
            const ufpAction = action[UFPRequestActions.UFP_REQUEST_ACTION]
            const dispatchWrapper = UFPMiddlewareUtils.wrapDispatcher(dispatch, getState, ufpAction)
            const {
                ufpDefinition,
                ufpPayload,
                ufpResultHandler,
                ufpPreHandler,
                ufpTypes
            } = ufpAction
            const ufpTypesUnited = {}
            const additionalPayload = {
                getState: getState,
                globalState: getState()
            }

            const thePayload = Object.assign({}, ufpPayload, additionalPayload)
            // Object.assign({}, ufpDefinition.actionConstants || {}, ufpAction.ufpTypes || {})
            // join together 2 action type definitions, one from action and one from definition, both definitions are handled as array
            UFPMiddlewareUtils.uniteActionResultTypes(ufpTypesUnited, ufpDefinition.actionConstants)
            // why executing twice ???
            UFPMiddlewareUtils.uniteActionResultTypes(ufpTypesUnited, ufpTypes)

            // // // console.log('UFP MIDDLEWARE ', ufpAction)
            // // // console.log('UFP MIDDLEWARE ', ufpTypes.REQUEST)
            // write back to action :( problematic, hence we change incoming action object ... may be resolved at a later point
            // action[UfpRequestActions.UFP_REQUEST_ACTION].ufpTypes = ufpTypes

            if (validationErrors.length) {
                //  // // console.log('UFP MIDDLEWARE validationErrors', validationErrors)
                dispatchWrapper({
                    type: UFPMiddlewareConstants.ActionConstants.UFP_ACTION_ERROR + ufpTypesUnited.REQUEST,
                    payload: new InvalidUFPAction(validationErrors)
                })
                //  reject()
            } else {
                var retry = true
                var retryCount = 0
                var makeRequest = true
                var totalSuccess = true
                var requestResponse= null
                /* dispatchWrapper({
                 type: ufpTypes.REQUEST,
                 payload: thePayload
                 })*/
                const resultContainerForPreHandler = {
                    ufpAction: {
                        ufpDefinition,
                        ufpPayload: thePayload,
                        ufpResultHandler,
                        ufpPreHandler,
                        ufpTypes: ufpTypesUnited
                    },
                    ufpDefinition,
                    dispatch: dispatchWrapper,
                    dispatchOriginal: dispatch,
                    getState: getState,
                    globalState: getState()
                }
                var configPrepared=UFPMiddlewareUtils.ufpMiddlewarePrepareConfig(ufpAction)
                if (UFPMiddlewareConfiguration.get().createConfig === undefined || typeof UFPMiddlewareConfiguration.get().createConfig !== 'function') {
                    throw new Error('Please register a createConfig function for axios with setCreateConfig in the MiddlewareConfiguration')
                }

                //  // console.log('UfP types', ufpTypesUnited)
                const allPreHandler = ([].concat(ufpPreHandler || [])).concat(UFPMiddlewareConfiguration.get().preRequestHandling)
                // // console.log('ufpPreHandler', ufpPreHandler, resultContainerForPreHandler, preHandler)
                const preHandlerResult = await UFPMiddlewareUtils.handlePreHandlers(allPreHandler, resultContainerForPreHandler)
                // // console.log('preHandlerResult ', preHandlerResult)
                // // console.log('UFPMiddleware PreHandlerResult makeRequest:', makeRequestResult)
                makeRequest = !preHandlerResult.break
                if (makeRequest) {
                    while (retry && retryCount < 5) {
                        retryCount += 1

                        //console.log('UFPMiddleware executing: ', retryCount, ufpAction)
                        const config = UFPMiddlewareConfiguration.get().createConfig(configPrepared,ufpAction, getState())
                        // // console.log('UFP MIDDLEWARE config', config)
                        dispatchWrapper({
                            type: ufpTypesUnited.REQUEST[0],
                            payload: thePayload
                        })
                        // Make the API call
                        if(options.debug) {
                            console.log('UFP MIDDLEWARE making request', config)
                        }

                        requestResponse= await UFPMiddlewareUtils.ufpMiddlewareRequest(options, config)

                        if(options.debug) {
                            console.log('UFP MIDDLEWARE making request finished', (requestResponse instanceof Error)? UFPMiddlewareUtils.errorToObject(requestResponse):requestResponse)
                        }

                        const resultContainerForHandler = {
                            ufpAction: {
                                ufpDefinition,
                                ufpPayload: thePayload,
                                ufpResultHandler,
                                ufpPreHandler,
                                ufpTypes: ufpTypesUnited
                            },
                            dispatch: dispatchWrapper,
                            dispatchOriginal: dispatch,
                            getState: getState,
                            globalState: getState(),
                            ufpDefinition,
                            requestResponse: requestResponse
                        }
                        var promiseAll0
                        var promiseAll1
                        var validateResult

                        var resultHandler
                        //  console.log('ufpResultHandler', ufpResultHandler, ufpDefinition)
                        if (ufpResultHandler !== undefined && ufpResultHandler.length > 0) {
                            resultHandler = ufpResultHandler
                            // // // console.log('resultHandler', resultHandler)
                            promiseAll0 = await UFPMiddlewareUtils.handleResultHandlers(resultHandler, resultContainerForHandler)
                            // console.log('UFPMiddleware HandlerResult: ', promiseAll0, resultHandler)
                            try {
                                validateResult = UFPMiddlewareUtils.validateResultHandlerResult(promiseAll0)
                                // console.log('ResultHandler', validateResult)
                                // console.log('UFPMiddleware Aggregated Result : ', validateResult)
                                if (validateResult.handled) {
                                    //   // // console.log('UFPMiddleware Response Handled')
                                    if (validateResult.success) {
                                        // dispatching of result data is done by the result handler
                                        // // console.log('UFPMiddleware Response Succesful')
                                        //    // // console.log('xxxxx middleware RESOLVING ')
                                        //    // // console.log('xxxxx middleware success1')

                                        //     // // console.log('xxxxx middleware success2')
                                    } else {
                                        //   // // console.log('xxxxx middleware not success3')
                                        //        console.warn('UFPMiddleware Response NOT Succesful')
                                    }
                                }
                            }
                            catch (err) {
                                // // // console.log('xxxxx middleware error5')
                                // console.warn('UFPMiddleware error: ' + err.message)
                            }
                        }
                        // console.log('UFPMiddleware validateResult: ', validateResult)
                        if (!resultHandler || (validateResult && validateResult.handled !== true)) {

                            promiseAll1 = await UFPMiddlewareUtils.handleResultHandlers(UFPMiddlewareConfiguration.get().resultHandlings.genericResultHandler, resultContainerForHandler)
                            try {
                                // console.log('genericResultHandler', promiseAll1)
                                validateResult = UFPMiddlewareUtils.validateResultHandlerResult(promiseAll1)

                            }
                            catch (err) {
                                // console.error('xxxxx middleware error5', err)
                                // console.warn('UFPMiddleware error: ' + err.message)
                            }
                        }

                        // console.log('xxxxx middleware promiseall1', promiseAll1, validateResult)
                        // check if if request is unhandled
                        if (!validateResult.handled && !validateResult.success && !validateResult.retry) {
                            //    console.warn('UFPMiddleware UNHANDLED RESULT UNSUSESFUL UNRETRY: ')
                            var promiseAll2
                            promiseAll2 = await UFPMiddlewareUtils.handleResultHandlers(UFPMiddlewareConfiguration.get().resultHandlings.unhandledResultHandler, resultContainerForHandler)

                            // // console.log('xxxxx middleware promiseall2',promiseAll2)
                            //    console.warn('UFPMiddleware UNHANDLED RESULT UNSUSESFUL UNRETRY: ', promiseAll2)
                            // set validate result to the one returned from unhandledResultHandler
                            validateResult = UFPMiddlewareUtils.validateResultHandlerResult(promiseAll2)
                            //    console.warn('UFPMiddleware UNHANDLED RESULT UNSUSESFUL UNRETRY: ', validateResult)
                        }

                        retry = validateResult.retry
                        if (!retry && !validateResult.success) {
                            // // // console.log('xxxxx middleware rejectin0')
                            dispatchWrapper({
                                type: ufpTypesUnited.FAIL,
                                payload: thePayload
                            })

                            totalSuccess = false

                            // // console.log('xxxxx middleware rejecting1')
                            //   reject()
                            // reject()
                            //   // // console.log('xxxxx middleware rejecting2')
                        }
                        //   // // console.log('xxxxx middleware looping3')
                    }
                } // end if(makeRequest)
                //  // // console.log('xxxxx middleware looping4')
                dispatchWrapper({
                    type: ufpTypesUnited.END,
                    payload: thePayload
                })
                if (totalSuccess) {
                    resolve(requestResponse)
                } else {
                    /*
                     discussion: when using reject here, every method has to rely on catching the promise error
                     so we dispatch an en
                     reject(axiosResponse)
                     */
                    resolve(requestResponse)
                }
                // // // console.log('xxxxx middleware end5')
                // console.warn('UFPMiddleware END finish: ')
            }
        })
        // // // console.log('MIDDLEWARE PROIMISE IS ', action, dispatchPromise)
        //return next(() => dispatchPromise)
        return dispatchPromise
    }
}

}
export default createUfpMiddleware
