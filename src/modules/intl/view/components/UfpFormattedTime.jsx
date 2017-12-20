import {FormattedRelative} from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'

const UfpFormattedTime= ({defaultMessage, id, values, ...rest}) => {
    return (
        <FormattedRelative defaultMessage={defaultMessage}
                           id={id}
                           {...rest}
                           values={values} />)
}

UfpFormattedTime.propTypes = {
    defaultMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    values: PropTypes.object
}

UfpFormattedTime.defaultProps = {
    defaultMessage: '',
    values: {}
}

// code for getting the intl context (providing fallbacks inf)
// UfpFormattedHtmlMessage.contextTypes = {intl: PropTypes.any}

export default UfpFormattedTime
