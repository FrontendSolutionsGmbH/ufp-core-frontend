import React from 'react'
import {Route} from 'react-router'
const ConvertRouter3DefTo4 = (routesObject) => {
    console.log('Converting', routesObject)
    var result = null
    if (routesObject.map) {
        console.log('Converting map', routesObject)
        return (<div>{ routesObject.map(ConvertRouter3DefTo4) }</div>)
    } else if (routesObject) {
        console.log('Converting object', routesObject)
        const Component = routesObject.component

        if (routesObject.childRoutes) {
            console.log('Converting childRoutes', routesObject)
            const resultChildren = routesObject.childRoutes.map(ConvertRouter3DefTo4)
            result = (<Component key={'route-comp-children-' + routesObject.path} >
                <Route component={routesObject.indexRoute.component}
                       exact
                       path={routesObject.path} />
                {resultChildren }
            </Component>)
        } else {
            console.log('Converting route', routesObject)
            result = (<Route key={'route-comp-' + routesObject.path}{...routesObject} />)
        }
    }

    console.log('Converting result', result)
    return result
}

export default ConvertRouter3DefTo4
