import PropTypes from 'prop-types'

const RunfestPropType = {

    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,

    onRegistered: PropTypes.func,
    configure: PropTypes.func,
    actionCreators: PropTypes.object,
    selectors: PropTypes.object
}

export default RunfestPropType