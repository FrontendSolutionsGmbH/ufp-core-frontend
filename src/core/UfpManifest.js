import UfpTypes from 'ufp-types'

const UfpManifestPropType =
    UfpTypes.shape({

        type: UfpTypes.string.isRequired,
        name: UfpTypes.string.isRequired,
        description: UfpTypes.string,
        register: UfpTypes.func.isRequired
    })

export default {

    PropType: UfpManifestPropType

}
