import React, {Component} from 'react'
import {connect} from 'react-redux'
import MenuSelectors from '../model/MenuSelectors'
import MenuActionCreators from '../controller/MenuActionCreators'

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

export default connect(mapStateToProps, mapDispatchToProps)
