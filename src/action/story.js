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
            .then((stories) => {dispatch(sa.req_success(stories, page))})
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


export const UserAction = {
    value: {
        req: 'User_req',
        req_success: 'User_req_success',
        req_fail: 'User_req_fail'
    },
    func: {
        req(){
            return {
                type: UserAction.value.req
            }
        },
        req_success(user){
            return {
                type: UserAction.value.req_success,
                user
            }
        },
        req_fail(err){
            return {
                type: UserAction.value.req_fail,
                err
            }
        }
    }
}

/**
 * 根据id 加载user
 * @param id userId
 */
export function loadUser(id) {
    return (dispatch, getState)=> {
        const ua = UserAction.func
        dispatch(ua.req())
        return FbServices.getUser(id)
            .then(user => dispatch(ua.req_success(user)))
            .catch(err => dispatch(ua.req))
    }
}
