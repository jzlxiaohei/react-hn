/**
 * Created by zilong on 3/30/16.
 */

// @flow

import FbServices from '../services/firebase'
import config from '../config'

/** 加载top story id 相关的action  **/
export const TopStoriesIdsAction = {
    value: {
        req: 'TopStoriesIds_req',
        req_success: 'TopStoriesIds_req_success',
        req_fail: 'TopStoriesIds_req_fail'
    },
    func: {
        req(){
            return {
                type: TopStoriesIdsAction.value.req
            }
        },
        req_success(stories, page){
            return {
                type: TopStoriesIdsAction.value.req_success
            }
        },
        req_fail(err){
            return {
                type: TopStoriesIdsAction.value.req_fail,
                err
            }
        }
    }
}

export function loadTopStoriesIds() {
    return (dispatch, getState) => {
        const tsa = TopStoriesIdsAction.func
        dispatch(ts.req())
        return FbServices.getStoryIds('topstories')
            .then(stories => dispatch(tsa.req_success(stories)))
            .catch(err => dispatch(tsa.req_fail(err)))
    }
}


/*** 加载 stories相关的action ***/
export const StoriesAction = {
    value: {
        req: 'Stories_req',
        req_success: 'Stories_req_success',
        req_fail: 'Stories_req_fail'
    },
    func: {
        req(){
            return {
                type: StoriesAction.value.req
            }
        },
        req_success(stories, page){
            return {
                type: StoriesAction.value.req_success,
                page,
                stories
            }
        },
        req_fail(err){
            return {
                type: StoriesAction.value.req_fail,
                err
            }
        }
    }
}


/**
 * 分页加载 story
 * @param page 页号
 * @returns {function()} redux-thunk 异步处理
 */
export function loadStoriesByPage(page) {
    page = page || 1
    return (dispatch, getState) => {
        const sa = StoriesAction.func

        dispatch(sa.req())
        return FbServices.getStoriesByPage('topstories', page, config.storiesPerPage)
            .then((stories) => {
                dispatch(sa.req_success(stories, page))
            })
            .catch((err) => dispatch(sa.req_fail(err)))
    }
}

export function loadFirstPageStories() {
    return (dispatch, getState) => {
        const state = getState()
        if (state.storyList.stories.length == 0) {
            return loadStoriesByPage()(dispatch, getState)
        }
    }
}


export const CurrentStoryAction = {
    value: {
        req: 'CurrentStory_req',
        req_success:'CurrentStory_req_success',
        req_fail:'CurrentStory_req_fail'
    },
    func: {
        req(){
            return {
                type: CurrentStoryAction.value.req,
            }
        },
        req_success(story){
            return {
                type: CurrentStoryAction.value.req_success,
                story
            }
        },
        req_fail(err){
            return {
                type: CurrentStoryAction.value.req_fail,
                err
            }
        }
    }
}

export function loadCurrentStory(id) {
    return (dispatch,getState) => {
        const csf = CurrentStoryAction.func
        dispatch(csf.req())
        return FbServices.getItem(id)
            .then(story => dispatch(csf.req_success(story)))
            .catch(err => dispatch(csf.req_fail(err)))
    }
}

