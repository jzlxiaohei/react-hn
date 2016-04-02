/**
 * Created by zilong on 4/2/16.
 */

// @flow
import {Component} from 'react';
import EasyTransition from 'react-easy-transition'

export default (WrappedContainer) => {

    return class EasyTransitionWrapper extends Component {
        render() {
            return (
                <EasyTransition path={location.pathname}
                                initialStyle={{opacity: 0}}
                                transition="opacity 0.3s ease-in"
                                finalStyle={{opacity: 1}}
                >
                    <WrappedContainer {...this.props} />
                </EasyTransition>
            )
        }
    }
}
