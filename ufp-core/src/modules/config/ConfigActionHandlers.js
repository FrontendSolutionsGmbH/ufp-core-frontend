import update from 'react-addons-update'
import ApiDefinition from 'api/ApiDefinition'

export default {
    [ApiDefinition.getGlobals.actionConstants.SUCCESS]: (state, action) => {
        //console.log('response', action.payload)
        return update(state, {
            data: {$set: action.payload.data.result}
        })
    }
}
