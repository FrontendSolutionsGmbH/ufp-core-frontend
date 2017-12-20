import {FormattedRelative} from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'

const UfpFormattedRelativeMessage = ({defaultMessage, id, values,...rest}) => {
    return (
        <FormattedRelative defaultMessage={defaultMessage}
                           id={id}
                           {...rest}
                           values={values} />)
}

UfpFormattedRelativeMessage.propTypes = {
    defaultMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    values: PropTypes.object
}

UfpFormattedRelativeMessage.defaultProps = {
    defaultMessage: '',
    values: {}
}

// code for getting the intl context (providing fallbacks inf)
// UfpFormattedHtmlMessage.contextTypes = {intl: PropTypes.any}

export default UfpFormattedRelativeMessage
