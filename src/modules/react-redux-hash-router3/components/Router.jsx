import React from 'react'
import ReactRouter from 'react-router/lib/Router'
import PropTypes from 'prop-types'

const Router = (props) => (
    <ReactRouter children={props.routes}
                 history={props.history} />
)

RouterThisIsATestForEslintCI.propTypes = {
    routes: PropTypes.object,
    history: PropTypes.object
}
export default Router
