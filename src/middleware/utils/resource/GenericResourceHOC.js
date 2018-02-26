import {connect} from 'react-redux'
import React, {Component} from 'react'
import HOCUtils from '../../../utils/HOCUtils'
import hoistNonReactStatic from 'hoist-non-react-statics'
import PropTypes from 'prop-types'
import _Get from 'lodash-es/get'

/**
 * factory method that returns a HigherOrder React component creator function
 *
 *
 * @param defintion
 * @param actionCreator
 * @param selector
 */
export default({actionCreator, selector}) => ({
    urlParams = 'resourceProps.urlParams',
    queryParams = 'resourceProps.queryParams',
    dataField = 'resourceData',
    errorView = (<div>Error...</div>),

    loadView = (<div>Loading...</div>),
    emptyView = (<div>Empty...</div>)

}) => (WrappedComponent) => {
    // console.log('GenericResourceHOC')
    class GenericResourceHOC extends Component {

        static propTypes = {
            resourceData: PropTypes.object.isRequired,
            loadResource: PropTypes.func.isRequired
        }

        /**
         *  check if data is available, if not reload
         *
         */
        componentDidMount() {
            if (this.props.resourceData === undefined) {
                this.loadResource()
            }
        }

        /**
         * is used to initialise and refresh
         */
        loadResource = () => {
            this.props.loadResource(
                {
                    urlParams: _Get(this.props, urlParams),
                    queryParams: _Get(this.props, queryParams)
                })
        }

        /**
         * in the render method we check the loading state of resource,
         * and if present the wrapped component is called with its properties
         * hiding most of the inner properties created by this wrapper
         */
        render() {
            const {resourceData}=this.props

            // console.log('GenericResourceHOC', this.props)
            if (resourceData !== undefined) {
                if (resourceData.isLoading) {
                    return loadView
                } else if (resourceData.hasError) {
                    return errorView
                } else {
                    return (<WrappedComponent {...Object.assign({}, this.props, {
                        [dataField]: resourceData.data,
                        refresh: this.loadResource,
                        loadResource: undefined
                    })} />)
                }
            } else {
                return emptyView
            }
        }

    }
    /**
     * utility preparation to forward static vars through wrapped component
     */
    hoistNonReactStatic(GenericResourceHOC, WrappedComponent)
    // create nice react displayname
    HOCUtils.addDisplayName({
        name: 'GenericResourceHOC',
        wrappedComponent: WrappedComponent,
        newComponent: GenericResourceHOC
    })

    /**
     * the mapstatetoprops is using the generated belonging selector which selects
     * from state based on url parameters from request
     */
    const mapStateToProps = (state, props) => ({
        /**
         * provided SELECTOR upon creation time gets fed the currents object urlParams
         * as input which returns the result from state
         */
        resourceData: selector(state, _Get(props, urlParams))
    })

    /**
     * here the required actioncreator is bound, it is created beforehand from
     * incoming definition, and is called via loadResource({urlParams,body,queryParms})
     * @type {{loadResource: *}}
     */
    const mapDispatchToProps = {

        /**
         *
         */
        loadResource: actionCreator

    }

    // finally wire it together to the redux store
    const connected = connect(mapStateToProps, mapDispatchToProps)

    // and return connected component
    return connected(GenericResourceHOC)
}
