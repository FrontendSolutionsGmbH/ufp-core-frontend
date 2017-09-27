import React from 'react'
import ReactRouter from 'react-router/lib/Router'

const Router = (props) => (
    <ReactRouter children={props.routes}
                 history={props.history} />
)

export default Router
