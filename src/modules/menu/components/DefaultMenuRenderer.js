import React, {Component} from 'react'
import PropTypes from 'prop-types'
import UfpList from '../../ufp-react/components/UfpList'
import DefaultMenuItemRenderer from './DefaultMenuItemRenderer'

class DefaultMenuRenderer extends Component {

    static propTypes = {
        data: PropTypes.shape({
            children: PropTypes.array
        }).isRequired
    }
    static defaultProps = {}

    render() {
        console.log('Rendering Default Menu ', this.props)
        return (<UfpList component={DefaultMenuItemRenderer}
                         data={this.props.data.children} />
        )
    }

}

export default DefaultMenuRenderer
