import React from 'react'
import {Router as ReactRouter} from 'react-router'

const Router = (props) => (
    <ReactRouter history={props.history}
                 children={props.routes} />
)

export default Router
