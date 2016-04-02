// @flow
import './stylus/global.styl'

// import 'babel-polyfill'
import 'react-fastclick';

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { Router, Route ,hashHistory,IndexRoute} from 'react-router'
import utils from './utils'
import configStore from './store/configStore'
import StoryList from './containers/storyList'
import UserDetail from './containers/user'
import StoryDetail from './containers/story'


import App from './containers/App'
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
            <Route path="/" component={App}>
                <IndexRoute component={StoryList}
                            onEnter={()=>{ utils.scroll.restoreScroll('StoryList') }}
                            onLeave={()=>{ utils.scroll.setScroll('StoryList') }}
                    />
                <Route path="/user/:userId" component={UserDetail}/>
                <Route path="/story/:storyId" component={StoryDetail}/>

            </Route>
        </Router>
    </Provider>
    , document.getElementById('root'))
