/**
 * Created by zilong on 3/30/16.
 */

// @flow

import FbServices from '../services/firebase'
import config from '../config'

/**
 *
 */

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

export const StoriesAction = {
    value: {
        req: 'Stories_req',
        req_success: 'Stories_req_success',
        req_fail: 'Stories_req_fail'
    },
    func: {
        req(){
            return {
                type: TopStoriesIdsAction.value.req
            }
        },
        req_success(stories, page){
            return {
                type: TopStoriesIdsAction.value.req_success,
                page,
                stories
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
