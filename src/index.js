// @flow
import './stylus/global.styl'

import 'babel-polyfill'
import 'react-fastclick';

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { Router, Route ,hashHistory,IndexRoute} from 'react-router'
import configStore from './store/configStore'
import StoryList from './containers/storyList'
import App from './App'
const store =  configStore({
    storyList:{
        page:1,
        stories:[],
        isLoading:true
    }
})

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={StoryList}/>
            </Route>
        </Router>
    </Provider>
    , document.getElementById('root'))
