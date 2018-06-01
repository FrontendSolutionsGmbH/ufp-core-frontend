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

        UfpCore.registerMiddleware({
            id: Runfest.name,
            middleware: ConfigureEpicsInternal.getMiddleware()
        })

        UfpCore.registerReducer({
                id: Runfest.name,
                reducer: (state = ConfigureEpicsInternal.getEpics()) => {
                    return state
                }
            }
        )
    },

    onPreStartup(){
        console.log('Hello People')
        ConfigureEpicsInternal.getEpics()
                              .forEach(epic => {
                                  console.log('Registering Pre Startup Epics', epic)
                                  ConfigureEpicsInternal.getMiddleware()
                                                        .run(epic)

                              })
    }
}

export default Runfest
