import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {UfpList} from '../../../ufp-react'
import DefaultMenuItemRenderer from './DefaultMenuItemRenderer'

class DefaultMenuRenderer extends Component {

    static propTypes = {
        menuItemRenderer: PropTypes.any,
        data: PropTypes.shape({
            children: PropTypes.array
        }).isRequired
    }
    static defaultProps = {
        menuItemRenderer: DefaultMenuItemRenderer
    }

    render() {
        const Component = this.props.menuItemRenderer

        return (<ul><UfpList component={Component}
                             data={this.props.data.children} /></ul>
        )
    }

}

export default DefaultMenuRenderer
