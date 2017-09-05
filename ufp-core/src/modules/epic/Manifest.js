import {ThrowParam} from '../../utils/JSUtils'

import ConfigureEpics from './ConfigureEpics'

const Manifest = {
    name: 'ufp-redux-rxjs ',
    description: 'Ufp Redux RxJs Manifest',

    onRegistered({UfpCore = ThrowParam('UfpCore Instance Required')}) {
        UfpCore.registerMiddlewareCreator({
            id: Manifest.name,
            middlewareCreatorFunction: ConfigureEpics.createEpicMiddleware
        })
    },
    registerEpic: (epic) => {
        ConfigureEpics.registerEpic({epic})
    }
}

// configure is the new register
Manifest.configure = Manifest.register

export default Manifest
