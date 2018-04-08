import React from 'react'
import createHistory from 'history/createBrowserHistory'
import {ConnectedRouter} from 'react-router-redux'
const history = createHistory()

const RouterProvider = ({children}) => {
    console.log('RENDERING RouterProvider')
    return (// provider is provided through ufp-react... just connect the router
        <ConnectedRouter history={history} >
            {children}
        </ConnectedRouter>
    )
}

export default RouterProvider
