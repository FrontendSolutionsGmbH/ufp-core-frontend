import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {IntlProvider} from 'react-intl'
import IntlSelectors from '../../model/IntlSelectors'

class UfpIntlProvider extends Component {

    render() {
        const {randomKey, locale, messages, children} =this.props
        console.log('Intl Provider rendering', children, locale, messages, randomKey)
        return (<IntlProvider key={randomKey}
                              locale={locale}
                              messages={messages} >
                {children}
            </IntlProvider>
        )
    }

}

UfpIntlProvider.propTypes = {
    children: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object,
    randomKey: PropTypes.number.isRequired
}

UfpIntlProvider.defaultProps = {
    messages: {}
}

const mapStateToProps = (state) => ({
    locale: IntlSelectors.CurrentLanguageSelector(state),
    messages: IntlSelectors.CurrentLanguageMessagesSelector(state),
    randomKey: IntlSelectors.randomIntlKey(state)
})

export default connect(mapStateToProps)(UfpIntlProvider)
