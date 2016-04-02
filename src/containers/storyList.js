/**
 * Created by zilong on 3/31/16.
 */

// @flow

import React from 'react'
import ListComponent from '../components/storyList'
// import {StoriesAction} from '../action/story'
import { connect } from 'react-redux';
import EasyTransition from 'react-easy-transition'
import {loadFirstPageStories} from '../action/story'

// var a = loadStoriesByPage()

const StoryListContainer = React.createClass({

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
            <EasyTransition path={location.pathname}
                initialStyle={{opacity: 0}}
                transition="opacity 0.3s ease-in"
                finalStyle={{opacity: 1}}
            >
                <ListComponent dispatch={this.props.dispatch}
                           stories={stories} isLoading={storyListProps.isLoading} page={storyListProps.page}/>
            </EasyTransition>
        )
    }
})

function mapStateToProps(state){
    return {storyList:state.storyList}
}

export default connect(mapStateToProps)(StoryListContainer)