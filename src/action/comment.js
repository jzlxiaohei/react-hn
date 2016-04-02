/**
 * Created by zilong on 4/1/16.
 */

// @flow

import FbServices from '../services/firebase'

export const CommentsAction = {
    value: {
        req: 'Comments_req',
        req_success: 'Comments_req_success',
        req_fail: 'Comments_req_fail'
    },
    func: {
        req(){
            return {
                type: CommentsAction.value.req
            }
        },
        req_success(comments){
            return {
                type: CommentsAction.value.req_success,
                comments
            }
        },
        req_fail(err){
            return {
                type: CommentsAction.value.req_fail,
                err
            }
        }
    }
}

export function loadComments(ids) {
    return (dispatch, getState)=> {
        const caf = CommentsAction.func
        dispatch(caf.req())
        return FbServices.getItems(ids)
            .then(comments => dispatch(caf.req_success(comments)))
            .catch(err => dispatch(caf.req_fail(err)))
    }
}

