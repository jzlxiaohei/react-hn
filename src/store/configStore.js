/**
 * Created by zilong on 3/31/16.
 */

// @flow

import {createStore, applyMiddleware,compose} from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk';


export default function (initState) {
    const store = createStore(
        rootReducer,
        initState,
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default
            store.replaceReducer(nextReducer)
        })
    }

    return store
}