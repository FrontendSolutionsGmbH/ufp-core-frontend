import React, {Component} from 'react'
import PropTypes from 'prop-types'
import UfpList from '../../react/components/UfpList'
import DefaultMenuRenderer from './DefaultMenuRenderer'

class DefaultMenuAreaRenderer extends Component {

    static propTypes = {
        menuArea: PropTypes.array.iRequired
    }
    static defaultProps = {}

    render() {
        console.log('Rendering Default Menu Area ', this.props)
        return (
            <UfpList data={this.props.menuArea}
              component={DefaultMenuRenderer} />

        )
    }

}

export default DefaultMenuAreaRenderer
