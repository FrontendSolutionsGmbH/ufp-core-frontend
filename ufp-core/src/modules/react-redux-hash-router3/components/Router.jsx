import React from 'react'
import ReactRouter from 'react-router/lib/Router'

const Router = (props) => (
    <ReactRouter history={props.history}
                 children={props.routes} />
)

export default Router
