import React from 'react'
import PropTypes from 'prop-types'

const DefaultMenuItemRenderer = ({data}) =>
    (
        data.component ? data.component : <div>{ data.name}</div>
    )
DefaultMenuItemRenderer.propTypes = {
    data: PropTypes.array.isRequired
}
export default DefaultMenuItemRenderer
