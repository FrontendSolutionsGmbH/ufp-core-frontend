import React from 'react'
import PropTypes from 'prop-types'
import {FormattedTime} from 'react-intl'

const UfpFormattedRelative= ({defaultMessage, id, values, ...rest}) => {
    return (
        <FormattedTime defaultMessage={defaultMessage}
                           id={id}
                           {...rest}
                           values={values} />)
}

UfpFormattedRelative.propTypes = {
    defaultMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    values: PropTypes.object
}

UfpFormattedRelative.defaultProps = {
    defaultMessage: '',
    values: {}
}

// code for getting the intl context (providing fallbacks inf)
// UfpFormattedHtmlMessage.contextTypes = {intl: UfpTypes.any}

export default UfpFormattedRelative
