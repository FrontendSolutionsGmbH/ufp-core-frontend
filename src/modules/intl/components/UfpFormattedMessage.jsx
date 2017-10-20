import {FormattedMessage} from 'react-intl'
import React, {
    Component
} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const UfpFormattedMessage = ({defaultMessage, id, values}) => (
    <FormattedMessage defaultMessage={defaultMessage}
                      id={id}
                      values={values} />)

UfpFormattedMessage.propTypes = {
    defaultMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    values: PropTypes.object
}

UfpFormattedMessage.defaultProps = {
    defaultMessage: '',
    values: {}
}

export default UfpFormattedMessage
