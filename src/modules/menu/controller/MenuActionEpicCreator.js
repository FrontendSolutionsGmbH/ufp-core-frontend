import MenuConstants from '../model/MenuConstants'
import {ofType} from 'redux-observable'
import {mapTo} from 'rxjs/operators'
/**
 * the menu relies on dedicated menu actions that arise from defined action names, this epic transforms
 * any givven actionName to actionName+MenuSuffix that is then handled in the menureducer
 * @param actionName
 */

const createEpicTransformActionToMenuAction = (actionName) => (action$, storeLite) => {
    // console.log('MenuActionEpic Action called ', action$)
    return action$.pipe(
        ofType(actionName),
        mapTo({
            type: actionName + MenuConstants.MENU_ACTION_SUFFIX,
            payload: {
                // getState: storeLite.getState
                getState: storeLite.getState
            }
        }))
}

export default {
    createEpicTransformActionToMenuAction
}
