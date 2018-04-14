import React from 'react'
import PropTypes from 'prop-types'
import {ConnectedRouter} from 'react-router-redux'
import history from '../history'

const RouterProvider = ({children}, context) => {
    console.log('RENDERING RouterProvider2', children, context)
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
