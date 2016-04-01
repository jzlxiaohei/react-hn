/**
 * Created by zilong on 3/31/16.
 */

// @flow

import React from 'react'
import ListComponent from '../components/storyList'
// import {StoriesAction} from '../action/story'
import { connect } from 'react-redux';

import {loadFirstPageStories} from '../action/story'

// var a = loadStoriesByPage()

const StoryList = React.createClass({

    getInitialState(){
        return {
            stories: [],
            page:1,
            isLoading:true
        }
    },

    componentDidMount(){
        this.props.dispatch(loadFirstPageStories())
    },

    render(){
        const storyListProps = this.props.storyList
        const stories = storyListProps.stories
        return (
            <ListComponent dispatch={this.props.dispatch}
                           stories={stories} isLoading={storyListProps.isLoading} page={storyListProps.page}/>
        )
    }
})

function mapStateToProps(state){
    return {storyList:state.storyList}
}

export default connect(mapStateToProps)(StoryList)