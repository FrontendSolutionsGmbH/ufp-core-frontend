import React from 'react'
import PropTypes from 'prop-types'
import ReactRouter from 'react-router/lib/Router'

const Router = (props) => (
    <ReactRouter history={props.history}>{props.routes}</ReactRouter>
)

Router.propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired
}
export default Router
