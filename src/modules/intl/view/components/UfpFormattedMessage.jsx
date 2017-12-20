import {FormattedMessage} from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'

const UfpFormattedMessage = ({defaultMessage, id, values, ...rest}) => {
    return (
        <FormattedMessage defaultMessage={defaultMessage}
                          id={id}
                          {...rest}
                          values={values} />)
}

UfpFormattedMessage.propTypes = {
    defaultMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    values: PropTypes.object
}

UfpFormattedMessage.defaultProps = {
    defaultMessage: '',
    values: {}
}
UfpFormattedMessage.contextTypes = {intl: PropTypes.any}

export default UfpFormattedMessage
