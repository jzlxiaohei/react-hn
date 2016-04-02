/**
 * Created by zilong on 4/2/16.
 */

// @flow

import React from 'react';
import EasyTransition from 'react-easy-transition'


const ua = navigator.userAgent.toLowerCase()
let EasyTransitionWrapper;
if(ua.indexOf('android')!=-1){
    EasyTransitionWrapper = React.createClass({
        render() {
            return (
                <div>
                    {this.props.children}
                </div>
            )
        }
    })
}else{
    EasyTransitionWrapper = React.createClass({
        render() {
            return (
                <EasyTransition path={location.pathname}
                                initialStyle={{opacity: 0}}
                                transition="opacity 0.3s ease-in"
                                finalStyle={{opacity: 1}}
                >
                    {this.props.children}
                </EasyTransition>
            )
        }
    }) 
}

export  default EasyTransitionWrapper
