/**
 * Created by zilong on 4/1/16.
 */

// @flow
import FbServices from '../services/firebase'

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