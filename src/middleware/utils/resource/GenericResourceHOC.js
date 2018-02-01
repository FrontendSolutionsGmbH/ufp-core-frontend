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
export default({defintion, actionCreator, selector}) => ({
    urlParams = 'resourceProps.urlParams',
    queryParams = 'resourceProps.queryParams',
    dataField = 'resourceDara',
    errorView = (<div>Error...</div>),

    loadView = (<div>Loading...</div>),
    emptyView = (<div>Empty...</div>),

}) => (WrappedComponent) => {
    console.log('GenericResourceHOC')
    class GenericResourceHOC extends Component {

        static propTypes = {
            startupCompany: PropTypes.object
        }

        static defaultProps = {
            startupCompany: undefined
        }

        componentDidMount() {
            this.loadResource()
        }

        loadResource() {

            if (this.props.startupCompany === undefined) {
                this.props.loadResource(
                    {
                        urlParams: _Get(this.props, urlParams),
                        queryParams: _Get(this.props, queryParams)
                    })
            }
        }

        render() {

            const {resourceData}=this.props

            console.log('GenericResourceHOC ', this.props)
            if (resourceData !== undefined) {
                if (resourceData.isLoading) {
                    return loadView
                } else if (resourceData.hasError) {

                    return errorView
                } else {
                    return (<WrappedComponent {...Object.assign({}, this.props, {
                        [dataField]: resourceData,
                        refresh: this.loadResource,
                        loadResource: undefined
                    })} />)
                }
            } else {

                return emptyView
            }

        }

    }
    hoistNonReactStatic(GenericResourceHOC, WrappedComponent)
    HOCUtils.addDisplayName({
        name: 'GenericResourceHOC',
        wrappedComponent: WrappedComponent,
        newComponent: GenericResourceHOC
    })

    const mapStateToProps = (state, props) => {
        console.log('INCOMING PROPS ARE', urlParams, props)

        return {
            /**
             * provided SELECTOR upon creation time gets fed the currents object urlParams
             * as input which returns the result from state
             */
            resourceData: selector(state, _Get(props, urlParams))
        }
    }

    const mapDispatchToProps = {

        /**
         *
         */
        loadResource: actionCreator

    }

    const connected = connect(mapStateToProps, mapDispatchToProps)

    return connected(GenericResourceHOC)
}

