import {FormattedMessage} from 'react-intl'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import IntlSelectors from '../IntlSelectors'

export class UfpPrintCurrentLanguage extends Component {

    static propTypes = {
        currentLanguage: PropTypes.string
    }

    render() {
        return (
            <FormattedMessage defaultMessage={this.props.currentLanguage}
                              id={'language_label_' + this.props.currentLanguage} />)
    }

}

const mapStateToProps = (state) => ({
    currentLanguage: IntlSelectors.CurrentLanguageSelector(state)
})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(UfpPrintCurrentLanguage)
