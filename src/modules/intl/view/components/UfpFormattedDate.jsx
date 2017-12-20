import {FormattedDate} from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'

const UfpFormattedDateMessage = ({defaultMessage, id, values,...rest}) => {
    return (
        <FormattedDate defaultMessage={defaultMessage}
                           id={id}
                           {...rest}
                           values={values} />)
}

UfpFormattedDateMessage.propTypes = {
    defaultMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    values: PropTypes.object
}

UfpFormattedDateMessage.defaultProps = {
    defaultMessage: '',
    values: {}
}

// code for getting the intl context (providing fallbacks inf)
// UfpFormattedHtmlMessage.contextTypes = {intl: PropTypes.any}

export default UfpFormattedDateMessage
