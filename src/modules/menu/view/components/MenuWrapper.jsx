import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MenuSelectors from '../../model/MenuSelectors'
import MenuActionCreators from '../../controller/MenuActionCreators'
import MenuConstants from '../../model/MenuConstants'
import DefaultMenuAreaRenderer from './DefaultMenuAreaRenderer'

class HOCMenu extends Component {

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
        // console.log('Rendering Wrapped Menu ', this.props)
        const Component = this.props.menuRenderer
        return (
            <Component menuAreaName={this.props.menuAreaName}
                       menuItemRenderer={this.props.menuItemRenderer}
                       menuItems={this.props.menuItems}
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

export default connect(mapStateToProps, mapDispatchToProps)(HOCMenu)
