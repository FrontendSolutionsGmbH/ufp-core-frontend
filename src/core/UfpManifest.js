import PropTypes from 'prop-types'

const UfpManifestPropType =
    PropTypes.shape({

        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        register: PropTypes.func.isRequired
    })

export default {

    PropType: UfpManifestPropType

}