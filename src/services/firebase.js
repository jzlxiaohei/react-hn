/**
 * Created by zilong on 3/30/16.
 */

// @flow

import Firebase from 'firebase'
import {Promise} from 'es6-promise'
const api = new Firebase('https://hacker-news.firebaseio.com/v0')

//TODO need to delete to avoid memory leak?
const Cache = {
    items: {},
    topStoryIds: []
}

//exports to window for debug
window.__Cache = Cache

const FirebaseService = {
    getStoryIds(path){
        return new Promise((resolve, reject) => {
            if (Cache.topStoryIds.length > 0) {
                resolve(Cache.topStoryIds)
            } else {
                api.child(path).once('value', snapshot=> {
                    Cache.topStoryIds = snapshot.val()
                    resolve(Cache.topStoryIds)
                }, reject)
            }
        })
    },
    getStoriesByPage: async function (path, page, limit) {
        try{
            const allIds = await FirebaseService.getStoryIds(path)
            const start = (page - 1) * limit
            const end = page * limit
            const ids = allIds.slice(start, end)
            return FirebaseService.getItems(ids)
        } catch (e){
            return Promise.reject(e)   
        }
    },
    getItem(id){
        return new Promise((resolve, reject) => {
            if (Cache.items[id]) {
                resolve(Cache.items[id])
            } else {
                api.child(`item/${id}`).once('value', (snapshot) => {
                    const story = snapshot.val()
                    Cache.items[id] = story
                    resolve(story)
                }, reject)
            }
        })
    },
    getItems(ids){
        return Promise.all(ids.map((id) => FirebaseService.getItem(id)))
    },
    getUser(id){
        return new Promise((resolve,reject)=>{
            api.child(`user/${id}`).once('value',snapshot => {
                resolve(snapshot.val())
            },reject)
        })
    }
}

export default FirebaseService