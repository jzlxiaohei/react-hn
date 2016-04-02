/**
 * Created by zilong on 4/1/16.
 */

// @flow
import React from 'react'
import {connect} from 'react-redux'
import UserComponent from '../components/user'
import {loadUser} from '../action/user'
import EasyTransition from 'react-easy-transition'

const UserContainer = React.createClass({

    componentDidMount(){
        const userId = this.props.params.userId
        const dispatch = this.props.dispatch
        dispatch(loadUser(userId))
    },

    render(){
        const props = this.props

        return (
            <EasyTransition path={location.pathname}
                            initialStyle={{opacity: 0}}
                            transition="opacity 0.3s ease-in"
                            finalStyle={{opacity: 1}}
            >
                <UserComponent user={props.user} isLoading={props.isLoading}/>
            </EasyTransition>
        )
    }
})

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps)(UserContainer)