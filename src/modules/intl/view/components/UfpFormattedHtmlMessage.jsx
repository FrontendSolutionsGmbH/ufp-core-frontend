import {FormattedHTMLMessage} from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'

const UfpFormattedHtmlMessage = ({defaultMessage, id, values}, context) => {
    console.log('CONTEXT IS ', context)
    return (
        <FormattedHTMLMessage defaultMessage={defaultMessage}
                              id={id}
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
