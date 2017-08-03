import PropTypes from 'prop-types'
/**
 * Extract JSON body from a server response made with fetch
 *
 * @function getJSON
 * @access public
 * @param {object} res - A raw response object
 * @returns {promise|undefined}
 */
const getJSON = async(res) => {
    const contentType = res.headers.get('Content-Type')
    const emptyCodes = [204, 205]

    if (!~emptyCodes.indexOf(res.status) && contentType && ~contentType.indexOf('json')) {
        return res.json()
    } else {
        return Promise.resolve()
    }
}

function PropTypesCheck(data, propTypes) {
  try {
    ReactPropTypesCheck(data, propTypes, true)
    return true
  } catch (e) {
    // console.error('Validation error', e)
    return false
  }
}

const ReactPropTypesCheck = (object, propTypes, _throw) => {

  // const stringJSON = JSON.stringify(object)
  var error = PropTypes.checkPropTypes(propTypes, object, 'prop')
  if (error) {
    if (_throw) {
      throw error
    } else {
      console.error(error.message)
    }
  }
}

export default {
    getJSON,
    ReactPropTypesCheck,
    PropTypesCheck
}
