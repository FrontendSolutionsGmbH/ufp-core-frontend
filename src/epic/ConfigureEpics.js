
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/filter'
import {combineEpics} from 'redux-observable'
import {createEpicMiddleware as _createEpicMiddleware} from 'redux-observable'
import JSUtils from '../utils/JSUtils.js'


/**
 * Singleton Epic Configuration, use this class to register epics
 */
class ConfigureEpics {

    epics = []
    registerEpic({epic=JSUtils.ThrowParam('epic has to be provided')}={epic:JSUtils.ThrowParam('epic has to be provided')}) {
        //logger.debug('ConfigureEpics.registerEpic', epic)
        this.epics.push(epic)
    }

    getEpics() {
        //logger.debug('ConfigureEpics.getEpics', this)
        return this.epics
    }
    createEpicMiddleware() {
        return _createEpicMiddleware(combineEpics(...this.getEpics()))
    }
    reset() {
        this.epics= []
    }

}

export default new ConfigureEpics() //same instance everytime
