import MenuConfigurationInternal from './MenuConfigurationInternal'
import update from 'react-addons-update'
import {isFunction, isArray} from 'lodash-es'

function createMenu(MenuConfig) {
    var actionNames = [
        //AuthConstants.ActionConstants.AUTHENTICATED,
        //AuthConstants.ActionConstants.UNAUTHENTICATED
    ]
    //uniqueActionNames(actionNames, actionNamesArray)

    // take actions from config and assign them, instead of submitting them separately
    // the actions are what triggers either the update of the menu area, either by using
    // a static menu def or a localised menu reducer
    if (MenuConfig.actions) {
        // console.log('Initialising menu, checking actions')

        Object.keys(MenuConfig.actions)
            .map((key) => {
                // console.log('Initialising menu, checking actions', key)
                actionNames.push(key)
            })
    }

    // console.log('GENERICMENU createGenericMenu ', MenuConfig)
    // console.log('GENERICMENU createGenericMenu', actionNames)
    MenuConfigurationInternal.registerMenuReducer({
        area: MenuConfig.settings.area || 'main',
        subArea: MenuConfig.settings.subArea,
        sortIndex: MenuConfig.settings.sortIndex,
        actionHandler: (data) => {
            // console.log('GENERICMENU ACTION HANDLER', data)
            function createEntry(item) {
                //console.log('createEntry', item)
                var children = []
                if (item.children !== undefined) {
                    item.children.map((child) => {
                        var result = createEntry(child)
                        result.map((entry) => {
                            children.push(entry)
                        })
                    })
                }
                var def = {
                    highLight: item.highLight,
                    sortIndex: item.sortIndex,
                    component: item.component,
                    styleClass: item.styleClass
                }
                if (item.intlSortAlphabetically === true) {
                    def.intlSortAlphabetically = true
                }
                if (children.length) {
                    def.children = children
                }

                if (item.routeName !== undefined) {
                    def.hash = item.routeName
                }

                if (item.hash !== undefined) {
                    def.hash = item.hash
                }

                if (item.callback !== undefined && isFunction(item.callback)) {
                    def.callback = item.callback
                }
                return [MenuConfigurationInternal.createMenuEntry(def)]
            }

            // if (MenuConfig.isAuthenticatedSelector(data.getState())) {
            //     //console.log('GENERICMENU ACTION HANDLER CREATING AUTHENTICATED MENU')
            //     var menuAuthenticated = []
            //     MenuConfig.authenticated.map((item) => {
            //         var result = []
            //         if (item.creator !== undefined) {
            //             result = getMenuEntryCreator(item.creator)(item, data)
            //         } else {
            //             result = createEntry(item)
            //         }
            //         result.map((entry) => {
            //             menuAuthenticated.push(entry)
            //         })
            //     })
            //     console.log('menuAuthenticated', menuAuthenticated)
            //
            //     return update(data.state, {$set: menuAuthenticated})
            // } else {
            //console.log('GENERICMENU ACTION HANDLER CREATING UNAUTHENTICATED MENU')

            var currentDef = MenuConfig.unauthenticated
            // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', MenuConfig, data.action.type.substr(-5))
            // remove menu suffix from action and check if in menu definition exists an entry for that
            if (MenuConfig.actions[data.action.type.substr(0, data.action.type.length - 5)]) {
                currentDef = MenuConfig.actions[data.action.type.substr(0, data.action.type.length - 5)]
            }

            var menuUnauthenticated = []

            if (isFunction(currentDef)) {
                currentDef = currentDef({
                    globalState: data.action.payload.getState(),
                    action: data.action
                })
            }
            // console.log('xxxxxxxxxxxxxxxmenu def is then ', currentDef)

            if (isArray(currentDef)) {
                currentDef.map((item) => {
                    const result = createEntry(item)
                    result.map((entry) => {
                        menuUnauthenticated.push(entry)
                    })
                })
            }
            // console.log('menuUnauthenticated', menuUnauthenticated)
            return update(data.state, {$set: menuUnauthenticated})
        },
        actionNames: actionNames
    })
}

export default {
    createMenuEntry: MenuConfigurationInternal.createMenuEntry,
    createMenu
}
