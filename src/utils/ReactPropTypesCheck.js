/**
 * @param {Object} object to be validated
 * @param {Object} propTypes object with defined prop types
 * @param {Boolean} _throw if set to true, invalid prop types will throw
 */
import PropTypes from 'ufp-types'

export const ReactPropTypesCheck = (object, propTypes, _throw) => {
    // console.warn('CHECKING: ', object, propTypes)
    const resi = PropTypes.checkUfpTypes(propTypes, object, 'prop', 'MyComponent')
    // console.warn('RESI OF UFP TYPES IS ', resi, object)

    if (resi.length === 0) {
        return true
    } else {
        if (_throw) {
            throw new Error('PROP TYPES FAIL')
        } else {
            return false
        }
    }
}
export const CheckPropTypes = ReactPropTypesCheck
export default {
    ReactPropTypesCheck,
    CheckPropTypes: ReactPropTypesCheck
}
