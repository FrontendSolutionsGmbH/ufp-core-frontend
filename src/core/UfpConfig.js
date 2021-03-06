import JSUtils from '../utils/JSUtils'

var config = {}

export default {

    getConfig: ({name}) => {
        // console.log('ufp core config is ', config)
        return config[name]
    },

    configure: ({data = JSUtils.ThrowParam('data has to be set for configure()')}) => {
        // console.log('ufp core config add ', data)
        // console.log('ufp core config is ', config)
        // merge all incming values with config
        config = Object.assign({}, config, data)
    }
}
