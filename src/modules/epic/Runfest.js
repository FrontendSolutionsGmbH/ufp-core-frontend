import {ThrowParam} from '../../utils/JSUtils'
import ConfigureEpicsInternal from './ConfigureEpicsInternal'

var onceRegistered = false

const Runfest = {
    name: 'ufp-redux-rxjs',
    description: 'Ufp Redux RxJs Manifest',

    onRegistered({UfpCore = ThrowParam('UfpCore Instance Required')}) {
        if (onceRegistered) {
            return
        }
        onceRegistered = true

        UfpCore.registerMiddlewareCreator({
            id: Runfest.name,
            middlewareCreatorFunction: ConfigureEpicsInternal.createEpicMiddleware
        })

        UfpCore.registerReducer({
                id: Runfest.name,
                reducer: (state = ConfigureEpicsInternal.getEpics()) => {
                    return state
                }
            }
        )
    }
}

export default Runfest
