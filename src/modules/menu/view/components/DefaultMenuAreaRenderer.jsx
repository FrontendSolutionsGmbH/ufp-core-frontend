import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {UfpList} from '../../../ufp-react'
import DefaultMenuRenderer from './DefaultMenuRenderer'

class DefaultMenuAreaRenderer extends Component {

    static propTypes = {
        menuArea: PropTypes.array.isRequired
    }
    static defaultProps = {}

    render() {
        // console.log('Rendering Default Menu Area ', this.props)
        return (
            <UfpList component={DefaultMenuRenderer}
                     data={this.props.menuArea} />

        )
    }

}

export default DefaultMenuAreaRenderer
