/**
 * Created by zilong on 3/31/16.
 */

// @flow
import assign from 'object-assign'
import {combineReducers} from 'redux'
import {StoriesAction,CurrentStoryAction} from '../action/story'
import {UserAction} from '../action/user'
// import {CommentsAction} from '../action/comment'

function storyList(state={} , action) {
    switch (action.type) {
        case StoriesAction.value.req:
            return assign({}, state, {isLoading: true})

        case StoriesAction.value.req_success:

            return assign({}, state, {
                stories: state.stories.concat(action.stories),
                isLoading: false,
                page: action.page + 1
            })

        case StoriesAction.value.req_fail:
            return assign({}, state, {
                isLoading: false,
                err: action.err
            })
        default:
            console.warn('unknown action type for story list: ' + action.type)
            return state
    }
}



function user(state={},action){
    switch (action.type){
        case UserAction.value.req:
            return {isLoading:true,user:{}}
        case UserAction.value.req_success:
            return {isLoading:false,user:action.user}
        case UserAction.value.req_fail:
            return {isLoading:false,err: action.err}

        default:
            console.warn('unknown action type for user: ' + action.type)
            return state
    }
    
}


function currentStory(state={},action){
    switch (action.type){
        case CurrentStoryAction.value.req:
            return {isLoading:true,story:{}}
        case CurrentStoryAction.value.req_success:
            return {isLoading:false,story:action.story}
        case CurrentStoryAction.value.req_fail:
            return {isLoading:false,err:action.err,story:{}}
        default:
            console.warn('unknown action type for currentStory: ' + action.type)
            return state
    }
}


const rootReducer = combineReducers({
    storyList,
    user,
    currentStory
})

export default rootReducer