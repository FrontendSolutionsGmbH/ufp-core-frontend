import React from 'react'
import PropTypes from 'prop-types'
import {FormattedHTMLMessage} from 'react-intl'

const UfpFormattedHtmlMessage = ({defaultMessage, id, values, ...rest}) => {
    return (
        <FormattedHTMLMessage defaultMessage={defaultMessage}
                              id={id}
                              {...rest}
                              values={values} />)
}

UfpFormattedHtmlMessage.propTypes = {
    defaultMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    values: PropTypes.object
}

UfpFormattedHtmlMessage.defaultProps = {
    defaultMessage: '',
    values: {}
}

// code for getting the intl context (providing fallbacks inf)
// UfpFormattedHtmlMessage.contextTypes = {intl: PropTypes.any}

export default UfpFormattedHtmlMessage
