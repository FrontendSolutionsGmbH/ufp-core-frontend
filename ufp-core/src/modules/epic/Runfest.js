import {ThrowParam} from '../../utils/JSUtils'

import ConfigureEpics from './ConfigureEpics'

var onceRegistered = false

const Runfest = {
    name: 'ufp-redux-rxjs ',
    description: 'Ufp Redux RxJs Manifest',

    onRegistered({UfpCore = ThrowParam('UfpCore Instance Required')}) {
        if (onceRegistered) {
            return
        }
        onceRegistered = true

        UfpCore.registerMiddlewareCreator({
            id: Runfest.name,
            middlewareCreatorFunction: ConfigureEpics.createEpicMiddleware
        })

        UfpCore.registerReducer({
                id: Runfest.name,
            reducer: (state = ConfigureEpics.getEpics()) => {
                    return state
                }
            }
        )
    },
    registerEpic: (epic) => {
        ConfigureEpics.registerEpic({epic})
    }
}

export default Runfest
