import {ThrowParam} from '../../utils/JSUtils'

import ConfigureEpics from './ConfigureEpics'

var onceRegistered = false

const Manifest = {
    name: 'ufp-intl',
    description: 'Ufp Internationalisation Manifest',

    onRegistered({UfpCore = ThrowParam('UfpCore Instance Required')}) {
        if (onceRegistered) {
            // todo: fixme: move verification of call thismethod once to core
            return
        }
        onceRegistered = true

        UfpCore.registerMiddlewareCreator({
            id: Manifest.name,
            middlewareCreatorFunction: ConfigureEpics.createEpicMiddleware
        })

        UfpCore.registerReducer({
                id: Manifest.name,
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

// configure is the new register
Manifest.configure = Manifest.register

export default Manifest
