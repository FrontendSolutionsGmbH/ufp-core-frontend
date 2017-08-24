// import update from 'react-addons-update'
// import ApiDefinition from 'api/ApiDefinition'
import {ThrowParam} from '../../utils/JSUtils'
import {setConfigValueAction} from './Manifest'

export default {

    setConfigValue: ({

        key = ThrowParam('Config Key has to be set'),
        value = ThrowParam('Config value has to be set'),
        area = 'default'
    }) => {
        return {
            action: setConfigValueAction.name,
            payload: {
                key,
                value,
                area
            }
        }
    }

}
