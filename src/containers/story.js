/**
 * Created by zilong on 4/2/16.
 */

// @flow

import React from 'react'
import {connect} from 'react-redux'
import StoryDetail from '../components/story'
import {loadCurrentStory} from '../action/story'
const CommentsContainer = React.createClass({

    getDefaultProps(){
        return {
            story: {}
        }
    },

    componentDidMount(){
        const sId = this.props.params.storyId
        const dispatch = this.props.dispatch
        dispatch(loadCurrentStory(sId))
    },

    render(){
        const props = this.props
        const story = props.story,
            isLoading = this.props.isLoading

        return (
            <StoryDetail story={story} isLoading={isLoading}/>
        )
    }
})

function mapStateToProps(state) {
    return state.currentStory
}

export default connect(mapStateToProps)(CommentsContainer)

