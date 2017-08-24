import {setConfigValueAction} from './Manifest'
import update from 'react-addons-update'

export default {

    [setConfigValueAction.name]: (state, action) => {
        console.log('Config Reducer Setting config value', action.payload)

        //initialise main data container
        if (state.data === undefined) {
            state = update(state, {
                data: {$set: {}}
            })
        }
        //initialise area data container
        if (state.data[action.payload.area] === undefined) {
            state = update(state, {
                data: {[action.payload.area]: {$set: {}}}
            })
        }

        // and set final value
        return update(state, {
            data: {
                [action.payload.area]: {
                    [action.payload.key]: {$set: action.payload.value}
                }
            }
        })
    }
}
