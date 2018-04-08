import React from 'react'
import {Route} from 'react-router'
const ConvertRouter3DefTo4 = (routesObject) => {
    // console.log('Converting', routesObject)
    var result = null
    if (routesObject) {

        const Component = routesObject.component

        if (routesObject.childRoutes) {

            const resultChildren = routesObject.childRoutes.map(ConvertRouter3DefTo4)
            result = (<Component key={'route-comp-children-' + routesObject.path} >
                <Route exact
                       path={routesObject.path}
                       component={routesObject.indexRoute.component} />
                {resultChildren }
            </Component>)
        } else {
            result = (<Route key={'route-comp-' + routesObject.path}{...routesObject} />)
        }

    }
    // console.log('Converting', routesObject, '-->', result)
    return result
}

export default ConvertRouter3DefTo4
