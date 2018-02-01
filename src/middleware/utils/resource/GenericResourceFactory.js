import GenericResourceSelector from './GenericResourceSelector'
import {createActionHandlerForRequestDefinition} from './GenericResourceActionHandler'
import UfpMiddlewareActionCreatorInternal from '../../UfpMiddlewareActionCreatorInternal'
import GenericResourceHOC from './GenericResourceHOC'

export const createResource = ({reducerName = 'DefaultResourceReducer', definition}) => {
    console.log('createResource called', reducerName, definition)

    /**
     * use existing middleware actioncreator utility function which provides
     * an action with the signature
     *
     * action({urlParams,queryParams,body})
     */
    const actionCreator = UfpMiddlewareActionCreatorInternal.createActionCreatorForDefinition(definition)
    /**
     * the action handler provides an hash object with the named
     * FAIL SUCCESS REQUEST END
     * actions that may be triggered from the provided ufp definition
     * it is stored in as key from the urlParams object hence its a resource
     */
    const actionHandler = createActionHandlerForRequestDefinition({definition})

    /**
     * the selector in turn uses the urlParams object to restore a request
     * from inside the reducer state
     */
    const selector = GenericResourceSelector({
        reducerName,
        definition
    })
    /**
     * for the higher order component all components are stitched together
     * although it is just a react higher order component, it serves as example
     * of how to build own hoc's using the provided utilities
     * actions,selectors,handlers
     *
     */
    const hoc = GenericResourceHOC({
        definition,
        actionCreator,
        selector
    })
    return {
        actionHandler,
        actionCreator,
        selector,
        hoc
    }
}
