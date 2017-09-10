import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './DefaultLoaderView.scss'

export class DefaultLoaderView extends Component {

    propTypes = {

        totalPercentage: PropTypes.number.isRequired,
        stagePercentage: PropTypes.number.isRequired,
        stepPercentage: PropTypes.number.isRequired

    }

    render() {
        return (  <div id="ufp-loader" >
                <div id="ufp-spinner" >
                    <div className="ufp-loader-bar"
                         style={
                             {

                                 height: this.props.totalPercentage + '%'
                             }} ></div>
                    <div className="ufp-loader-bar"
                         style={
                             {

                                 height: this.props.stepPercentage + '%'
                             }} ></div>
                    <div className="ufp-loader-bar"
                         style={
                             {

                                 height: this.props.stagePercentage + '%'
                             }
                         } ></div>
                </div>
            </div>
        )
    }

}
export default DefaultLoaderView
