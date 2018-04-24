import {createKeyFromUrlParams} from './GenericResourceActionHandler'

/**
 * the selector is created from the reducername - to obtain the whole reducer state -
 * the result is then resolved by creating a key from the provided url parameters
 *
 * warning: THIS SELECTOR is used only inside this util, it is sensitive for the incoming
 * props, because only the queryParams are used to resolve the
 * @param reducerName
 * @param definition
 */
export default ({reducerName}) => (state, props) => {
    const result = state[reducerName][createKeyFromUrlParams(props)]
    console.log('Returning from HOC Selector ', reducerName, state, props, result)
    return result
}
