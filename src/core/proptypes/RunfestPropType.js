/**
 * these prop types hold the
 */
import UfpTypes from 'ufp-types'

const RunfestPropType = {
    name: UfpTypes.string.isRequired,
    description: UfpTypes.string.isRequired,
    onConfigure: UfpTypes.func,
    onRegistered: UfpTypes.func,
    actionCreators: UfpTypes.object,
    selectors: UfpTypes.object
}

export default RunfestPropType
