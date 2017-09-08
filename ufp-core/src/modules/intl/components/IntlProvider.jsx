import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {IntlProvider} from 'react-intl'
import React from 'react'
import IntlSelectors from '../IntlSelectors'

const Provider = ({store, randomKey, locale, messages, children}) => ((
  <IntlProvider key={randomKey}
                locale={locale}
                messages={messages}
  >
    {children}
  </IntlProvider>
))

Provider.propTypes = {
  children: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object,
  randomKey: PropTypes.number.isRequired,
  store: PropTypes.any.isRequired
}

Provider.defaultProps = {
  messages: {}
}

const mapStateToProps = (state) => ({
  locale: IntlSelectors.CurrentLanguageSelector(state),
  messages: IntlSelectors.CurrentLanguageMessagesSelector(state),
  randomKey: IntlSelectors.randomIntlKey(state)
})

export default connect(mapStateToProps)(Provider)
