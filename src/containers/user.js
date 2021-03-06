/**
 * Created by zilong on 4/1/16.
 */

// @flow
import React from 'react'
import {connect} from 'react-redux'
import UserComponent from '../components/user'
import {loadUser} from '../action/user'
import EasyTransitionWrapper from './EasyTransitionWrapper'


const UserContainer = React.createClass({

    componentDidMount(){
        const userId = this.props.params.userId
        const dispatch = this.props.dispatch
        dispatch(loadUser(userId))
    },

    render(){
        const props = this.props

        return (
            <EasyTransitionWrapper>
                <UserComponent user={props.user} isLoading={props.isLoading}/>
            </EasyTransitionWrapper>
        )
    }
})

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps)(UserContainer)