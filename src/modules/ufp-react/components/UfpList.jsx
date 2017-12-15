import React from 'react'
import PropTypes from 'prop-types'

const UFPList = ({data, component, ...props}) => {
    var content = []
    if (data && data.map) {
        content = data.map((item) => {
            const ComponentNew = component
            return (<ComponentNew data={item}
                                  {...props} />)
        })
    }
    return (<React.Fragment>
        {content}
    </React.Fragment>)

}

UFPList.propTypes = {
    component: PropTypes.any,
    data: PropTypes.array.isRequired
}
UFPList.defaultProps = {
    component: <div />,
    data: []
}

export default UFPList
