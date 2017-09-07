import MenuConfigurationInternal from './MenuConfigurationInternal'
import update from 'react-addons-update'

function uniqueActionNames(actionNamesUnique, actionNamesArray) {
    // TODO: FIXME: merge instead of rewrite ....
    if (Array.isArray(actionNamesArray)) {
        actionNamesArray.map((actionName) => {
            if (actionNamesUnique.indexOf(actionName) === -1) {
                actionNamesUnique.push(actionName)
            }
        })
    }
}

function createMenu(MenuConfig, actionNamesArray) {
    var actionNames = [
        //AuthConstants.ActionConstants.AUTHENTICATED,
        //AuthConstants.ActionConstants.UNAUTHENTICATED
    ]
    uniqueActionNames(actionNames, actionNamesArray)
    console.log('GENERICMENU createGenericMenu', MenuConfig)
    console.log('GENERICMENU createGenericMenu', actionNames)
    MenuConfigurationInternal.registerMenuReducer({
        area: MenuConfig.settings.area || 'main',
        subArea: MenuConfig.settings.subArea,
        sortIndex: MenuConfig.settings.sortIndex,
        actionHandler: (data) => {
            console.log('GENERICMENU ACTION HANDLER', data)
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

                if (item.callback !== undefined && typeof item.callback === 'function') {
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
            const menuUnauthenticated = []
            MenuConfig.unauthenticated.map((item) => {
                const result = createEntry(item)
                result.map((entry) => {
                    menuUnauthenticated.push(entry)
                })
            })
            console.log('menuUnauthenticated', menuUnauthenticated)
            return update(data.state, {$set: menuUnauthenticated})
        },
        actionNames: actionNames
    })
}

export default {
    createMenuEntry: MenuConfigurationInternal.createMenuEntry,
    createMenu
}
