import {FormattedTime} from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'

const UfpFormattedTimeMessage = ({defaultMessage, id, values,...rest}) => {
    return (
        <FormattedTime defaultMessage={defaultMessage}
                           id={id}
                           {...rest}
                           values={values} />)
}

UfpFormattedTimeMessage.propTypes = {
    defaultMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    values: PropTypes.object
}

UfpFormattedTimeMessage.defaultProps = {
    defaultMessage: '',
    values: {}
}

// code for getting the intl context (providing fallbacks inf)
// UfpFormattedHtmlMessage.contextTypes = {intl: PropTypes.any}

export default UfpFormattedTimeMessage
