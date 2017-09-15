import React, {Component} from 'react'
import PropTypes from 'prop-types'
import UfpList from '../../react/components/UfpList'
import DefaultMenuItemRenderer from './DefaultMenuItemRenderer'

class DefaultMenuRenderer extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired
    }
    static defaultProps = {}

    render() {
        console.log('Rendering Default Menu ', this.props)
        return (<UfpList data={this.props.data.children}
          component={DefaultMenuItemRenderer} />
        )
    }

}

export default DefaultMenuRenderer
