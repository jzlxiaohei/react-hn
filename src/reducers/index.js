/**
 * Created by zilong on 3/31/16.
 */

// @flow
import assign from 'object-assign'
import {combineReducers} from 'redux'
import {StoriesAction} from '../action/story'

function storyList(state = {
    page: 1, stories: [],
    isLoading: true, err: null
}, action) {
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

const rootReducer = combineReducers({
    storyList
})

export default rootReducer