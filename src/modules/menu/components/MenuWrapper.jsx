import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import MenuSelectors from '../MenuSelectors'
import MenuActionCreators from '../MenuActionCreators'
import MenuConstants from '../MenuConstants'
import DefaultMenuAreaRenderer from './DefaultMenuAreaRenderer'

class MenuWrapper extends Component {

    static propTypes = {
        menuAreaName: PropTypes.string,
        menuItems: PropTypes.array,
        menuRenderer: PropTypes.any,
        menuItemRenderer: PropTypes.any,
        menuSubAreaName: PropTypes.string
    }
    static defaultProps = {
        menuAreaName: MenuConstants.DEFAULT_AREA,
        menuSubAreaName: MenuConstants.DEFAULT_SUBAREA,
        menuRenderer: DefaultMenuAreaRenderer,
        menuItems: [],
        menuItemRenderer: undefined
    }

    render() {
        console.log('Rendering Wrapped Menu ', this.props)
        const Component = this.props.menuRenderer
        return (
            <Component menuAreaName={this.props.menuAreaName}
                       menuItems={this.props.menuItems}
                       menuItemRenderer={this.props.menuItemRenderer}
                       menuSubAreaName={this.props.menuSubAreaName} />
        )
    }

}

const mapStateToProps = (state, props) => ({
    menuItems: MenuSelectors.MenuSubAreaSelector(state, {
        menuAreaName: props.menuAreaName,
        menuSubAreaName: props.menuSubAreaName
    })
})

const mapDispatchToProps = {
    menuClick: MenuActionCreators.menuClick,
    menuClose: MenuActionCreators.menuClose,
    menuSwitchOpenClose: MenuActionCreators.menuSwitchOpenClose,
    menuOpen: MenuActionCreators.menuOpen
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuWrapper)
