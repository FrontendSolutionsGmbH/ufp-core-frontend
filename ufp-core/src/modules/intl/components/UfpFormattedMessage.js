import {FormattedMessage} from 'react-intl'
import React, {
    Component
} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

export class HomeView extends Component {

    propTypes = {
        id: PropTypes.string.isRequired,
        defaultMessage: PropTypes,
        values: PropTypes.object
    }

    render() {
        return (
            <FormattedMessage id={this.props.id}
              values={this.props.values}
              defaultMessage={this.props.defaultMessage} />)
    }

}

const mapStateToProps = () => ({})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
