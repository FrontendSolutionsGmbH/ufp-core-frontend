import {FormattedDate} from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'

const UfpFormattedDate = ({defaultMessage, id, values, ...rest}) => {
    return (
        <FormattedDate defaultMessage={defaultMessage}
                           id={id}
                           {...rest}
                           values={values} />)
}

UfpFormattedDate.propTypes = {
    defaultMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    values: PropTypes.object
}

UfpFormattedDate.defaultProps = {
    defaultMessage: '',
    values: {}
}

// code for getting the intl context (providing fallbacks inf)
// UfpFormattedHtmlMessage.contextTypes = {intl: PropTypes.any}

export default UfpFormattedDate
