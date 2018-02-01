/**
 *  this provides a standard behaviour for resources in the store, listening to the
 *  REQUEST FAIL, SUCCESS END actions defined by the ufp-middleware
 *
 *  howto use:
 *
 *  it returns a hash object for the provided action names of the ufp request,
 *  and handles the actions accordingly
 *
 *  creates an entry using the urlParameters of the request, meaning it is a resource
 *  the resource provides the loading state and error state
 *
 *  const ApiDefinition = {
    someRequest: {
        url: '{api}api//{id}',
        method: UFPMiddlewareConstants.RequestMethodConstants.GET,
        requestType: UFPMiddlewareConstants.RequestTypeConstants.UFP_REQUEST_SECURED
    }
}


 // create standardized action names from name SOME_REQUEST
 ApiDefinition.someRequest = Object.assign({actionConstants: ReduxUtils.createAsyncResponseActionNames(ReduxUtils.camelCaseToConstant('someRequest')}, ApiDefinition.someRequest)
 }

 // reducer could look like this


 const actionHandler = createActionHandlerForRequestDefinition(ApiDefinitionStartupCompany.getStartupCompany)

 export default ReduxUtils.createReducer(initialState, actionHandler)

 // and selector could look like this

 const Selector = (state, props) => {


    return state.Reducer[createKeyFromUrlParams(props)]
}


 ///
 mapStateToProps=(state,props){
 // important, since key is created from url params, provide JUST these (as opposed to ...props)
    result: Selector(state,{id:props.id})
 }

 /////////////////////////////////////////
 *
 *
 */
import update from 'react-addons-update'

export const createKeyFromUrlParams = (params) => {
    var result = ''
    if (params === undefined || params === null) {
        return 'no-data'
    }

    Object.keys(params).forEach((key) => {

        result += key + '-' + params[key]

    })

    return result

}
export const createKeyFromPayload = (payload) => {
    const params = payload.ufpAction.ufpData.urlParams
    return createKeyFromUrlParams(params)
}

export const createActionHandlerForRequestDefinition = ({definition}) => {

    // create handler for fail/request ... actions
    return {
        [definition.actionConstants.SUCCESS]: (state, action) => {
            console.log('GENERIC HANDLER SUCCESS', state, action)
            const key = createKeyFromPayload(action.payload)
            console.log('GENERIC HANDLER SUCCESS', key)
            state = update(state, {
                [key]: {
                    hasError: {$set: false},
                    dates: {
                        dateEnded: {$set: new Date()}
                    },
                    data: {$set: action.payload.data}
                }

            })

            console.log('GENERIC HANDLER SUCCESS', state)

            return state

        },
        [definition.actionConstants.FAILURE]: (state, action) => {
            // console.log('GENERIC HANDLER FAILURE', action)
            const key = createKeyFromPayload(action.payload)

            state = update(state, {
                [key]: {

                    hasError: {$set: true},
                    dates: {
                        dateEnded: {$set: new Date()}
                    },
                    data: {$set: action.payload.data}
                }

            })

            return state
        },
        [definition.actionConstants.REQUEST]: (state, action) => {
            console.log('GENERIC HANDLER REQUEST', action)

            const key = createKeyFromPayload(action.payload)

            // console.log('GENERIC HANDLER REQUEST', key)
            state = update(state, {
                [key]: {
                    $set: {
                        isLoading: true,
                        hasError: false,
                        dates: {
                            loadStart: new Date()
                        },
                        data: undefined
                    }
                }
            })

            return state
        },
        [definition.actionConstants.END]: (state, action) => {
            console.log('GENERIC HANDLER END', action)
            const key = createKeyFromPayload(action.payload)
            state = update(state, {
                [key]: {
                    isLoading: {$set: false},

                }

            })

            return state
        }

    }

}

