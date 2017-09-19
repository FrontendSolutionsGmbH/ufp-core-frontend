import React from 'react'
import PropTypes from 'prop-types'

const DefaultMenuItemRenderer = ({data}) =>
    (
        data.component ? data.component : <div>{ data.name}</div>
    )
DefaultMenuItemRenderer.propTypes = {
    data: PropTypes.object.isRequired
}
export default DefaultMenuItemRenderer
