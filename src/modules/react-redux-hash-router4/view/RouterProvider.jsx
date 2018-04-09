import React from 'react'
import PropTypes from 'prop-types'
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
RouterProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default RouterProvider
