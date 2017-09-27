const UFP_API_TYPE = 'UFP_API_TYPE'
const UFP_VERSION = 'UFP_VERSION'
const UFP_NODE_ENV = 'UFP_NODE_ENV'
const UFP_THEME = 'UFP_THEME'
const UFP_FORCE = 'FORCE'

const API_TYPES = ['live', 'mock']
const NODE_ENVS = ['production', 'development', 'test']

module.exports = {
    TEST_REPORT_FOLDER: 'test-report',
    MAKE_OPTIONS: {
        [UFP_FORCE]: {
            boolean: true,
            describe: `allow fail of single steps`,
            default: false,

        },

        [UFP_VERSION]: {
            describe: `project specific version, 
        provided as UFP_VERSION environment variable
`,
            default: 'ufp-version-default'

        },
        [UFP_API_TYPE]: {
            describe: `api type, 
        provided as UFP_API_TYPE environment variable
`,
            default: API_TYPES[0],
            choices: API_TYPES
        },
        [UFP_NODE_ENV]: {
            describe: `node environment value, 
        provided as NODE_ENV environment variable
`,
            default: NODE_ENVS[0],
            choices: NODE_ENVS
        },
        [UFP_THEME]: {
            describe: `theming , 
        provided as UFP_THEME environment variable
`,
            default: 'default'
        }
    }
}