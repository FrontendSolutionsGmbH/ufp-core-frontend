import React from 'react'
import PropTypes from 'prop-types'

const UFPList = ({data, props, component, inputRef = undefined}) => {
    var content = []
    if (data && data.map) {
        data.map((item, index) => {
            const ComponentNew = component
            console.log('Rendering UFP ComponentNew', ComponentNew)
            content.push(
                <ComponentNew data={item}
                              inputRef={inputRef}
                              {...props}
                              key={'list-' + (item.id || item.name || index)} />
            )
        })
    }
    /**
     * note:
     *  until react 16 is out we have to contain it in a wrapped <div> :(
     */
    if (content.length === null) {
        return null
    } else {
        return (content)
    }
}

UFPList.propTypes = {
    component: PropTypes.any,
    data: PropTypes.array.isRequired,
    inputRef: PropTypes.func,
    props: PropTypes.any
}
UFPList.defaultProps = {
    props: {},
    component: <div />,
    data: [],
    inputRef: undefined
}

export default UFPList
