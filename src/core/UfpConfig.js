var config = {}

export default {

    getConfig: () => {
        return config

    },

    configure: (data) => {

        // merge all incming values with config
        config = Object.assign({}, config, data)

    }
}